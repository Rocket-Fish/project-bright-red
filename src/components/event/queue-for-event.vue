<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <h3 class="title is-3">
        Queue for this event
      </h3>
      <h5 class="subtitle">Please select roles you are willing to play</h5>
      <div class="field">
        <RecursiveCheckbox :roles="roles" @check="selectRole" :disabled="isLoading" />
        <p class="help" :class="{ 'is-danger': containsError }">{{ error }}</p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" :class="{ 'is-loading': isLoading }" :disabled="isLoading || !isLoggedIn" @click="onJoinQueue">
            Join Queue
          </button>
        </div>
        <div class="control">
          <button class="button is-link is-light" :class="{ 'is-loading': isLoading }" :disabled="isLoading || !isLoggedIn" @click="onLeaveQueue">
            LeaveQueue
          </button>
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
        const result = await leaveEventQueue(props.event.id);
        console.log(result);
      } catch (e) {
        error.value = e.errors[0].message;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      roles,
      isLoading,
      isLoggedIn,
      error,
      containsError,
      myQueuePosition,

      // methods
      selectRole,
      onJoinQueue,
      onLeaveQueue,
    };
  },
});
</script>
<style lang="scss" scoped></style>
