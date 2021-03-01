<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <h3 class="title is-3">
        Queue for this event
      </h3>
      <h5 class="subtitle">Please select roles you are willing to play</h5>
      <div class="columns is-multiline is-vcentered">
        <div class="column">
          <div class="field">
            <RecursiveCheckbox :roles="roles" @check="selectRole" :disabled="isLoading || inQueue" />
            <p class="help" :class="{ 'is-danger': containsError }">{{ error }}</p>
          </div>
          <div class="field is-grouped">
            <div class="control" v-if="!inQueue">
              <button class="button is-link" :class="{ 'is-loading': isLoading }" :disabled="isLoading || !isLoggedIn" @click="onJoinQueue">
                Join Queue
              </button>
            </div>
            <div class="control" v-else>
              <button class="button is-link is-light" :class="{ 'is-loading': isLoading }" :disabled="isLoading || !isLoggedIn" @click="onLeaveQueue">
                LeaveQueue
              </button>
            </div>
          </div>
        </div>
        <div class="column" v-if="inQueue">
          <p class="m-0">Queue Postion</p>
          <h1 class="title is-1">{{ position }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { getRoles } from "@/services/role.service";
import useIsLoading from "@/composables/useLoading";
import { useStore } from "vuex";
import { joinEventQueue, Event, EventQueueConfig, getMyQueuePosition, leaveEventQueue, Candidate } from "@/services/event.service";
import useRole, { RoleSelection } from "@/composables/event/useRoles";
import useError from "@/composables/useError";

import RecursiveCheckbox from "./recursive-checkbox.vue";

export default defineComponent({
  name: "queue-for-event",
  components: {
    RecursiveCheckbox,
  },
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const { selectRole, roles, rolesAsArray, convertArrayToRole } = useRole();
    const { isLoading } = useIsLoading();
    const { error, containsError } = useError();
    const myQueuePosition = ref(null as Candidate | null);
    const inQueue = computed(() => myQueuePosition.value !== null);

    onMounted(async () => {
      try {
        isLoading.value = true;
        error.value = "";
        roles.value = (await getRoles()) as RoleSelection[];
        try {
          myQueuePosition.value = await getMyQueuePosition(props.event.id);
          convertArrayToRole(myQueuePosition.value.roles);
        } catch (e) {
          // do nothing cuz this error is expected. This erroring out means havn't registered yet.
        }
      } catch (e) {
        error.value = e.errors[0].message;
      } finally {
        isLoading.value = false;
      }
    });

    const onJoinQueue = async () => {
      try {
        error.value = "";
        isLoading.value = true;
        const config = {
          forEvent: props.event.id,
          roles: JSON.stringify(rolesAsArray.value),
        } as EventQueueConfig;

        myQueuePosition.value = await joinEventQueue(config);
      } catch (e) {
        error.value = e.errors[0].message;
      } finally {
        isLoading.value = false;
      }
    };

    const onLeaveQueue = async () => {
      error.value = "";
      try {
        isLoading.value = true;
        await leaveEventQueue(props.event.id);
        myQueuePosition.value = null;
      } catch (e) {
        error.value = e.errors[0].message;
      } finally {
        isLoading.value = false;
      }
    };

    const position = computed(() => {
      if (!inQueue.value) return "";
      const { length } = props.event.queue;
      if (length === 0) return "1/1";
      const index = props.event.queue.findIndex((candidate) => myQueuePosition.value && candidate.id === myQueuePosition.value.id);
      if (index === -1) {
        return `~${length + 1}`;
      }
      return `${index + 1}/${length}`;
    });

    return {
      roles,
      isLoading,
      isLoggedIn,
      error,
      containsError,
      myQueuePosition,
      inQueue,
      position,

      // methods
      selectRole,
      onJoinQueue,
      onLeaveQueue,
    };
  },
});
</script>
<style lang="scss" scoped></style>
