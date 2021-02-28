<template>
  <div class="card mb-5">
    <div class="card-content">
      <h3 class="title is-3">
        Queue for this event
      </h3>
      <h5 class="subtitle">Please select roles you are willing to play</h5>
      <div class="field">
        <RecursiveCheckbox :roles="roles" @check="selectRole" :disabled="isLoading" />
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-link"
            :class="{ 'is-loading': isLoading }"
            :disabled="isLoading || !isLoggedIn"
            @click="onJoinQueue"
          >
            Join Queue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { getRoles, Role } from "@/services/role.service";
import useIsLoading from "@/composables/useLoading";
import { useStore } from "vuex";

import RecursiveCheckbox from "./recursive-checkbox.vue";

export interface RoleSelection extends Role {
  isSelected?: boolean;
  subroles: RoleSelection[];
}

export default defineComponent({
  name: "queue-for-event",
  components: {
    RecursiveCheckbox,
  },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const roles = ref([] as RoleSelection[]);
    onMounted(async () => {
      roles.value = (await getRoles()) as RoleSelection[];
    });

    const selectRole = (r: string) => {
      const makeAllSubrolesTrue = (rSelection: RoleSelection): RoleSelection => {
        const subroles = rSelection.subroles ? rSelection.subroles.map(makeAllSubrolesTrue) : [];
        return {
          ...rSelection,
          isSelected: true,
          subroles,
        };
      };
      const roleMapper = (rSelection: RoleSelection): RoleSelection => {
        const isMatch = rSelection.name === r;
        const mapFunction = isMatch && !rSelection.isSelected ? makeAllSubrolesTrue : roleMapper;
        const subroles = rSelection.subroles ? rSelection.subroles.map(mapFunction) : [];
        return {
          ...rSelection,
          isSelected: isMatch ? !rSelection.isSelected : rSelection.isSelected,
          subroles,
        } as RoleSelection;
      };

      roles.value = roles.value.map(roleMapper);
    };

    const { isLoading } = useIsLoading();

    return {
      roles,
      isLoading,
      isLoggedIn,

      // methods
      selectRole,
    };
  },
});
</script>
<style lang="scss" scoped></style>
