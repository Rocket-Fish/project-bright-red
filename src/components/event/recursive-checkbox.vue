<template>
  <div class="control" v-for="[i, role] of roles.entries()" :key="`${role.name}-${i}`">
    <label :for="role.name" class="checkbox">
      <input type="checkbox" class="checkbox" :id="role.name" :checked="role.isSelected" :disabled="disabled" @change="emitRole(role.name)" />
      {{ role.name }}
    </label>
    <div class="pl-4" v-if="role.subroles">
      <recursive-checkbox :roles="role.subroles" @check="emitRole" :disabled="disabled" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RoleSelection } from "@/composables/event/useRoles";

export default defineComponent({
  name: "recursive-checkbox",
  emits: ["check"],
  props: {
    roles: {
      type: Object as PropType<RoleSelection[]>,
      required: true,
    },
    disabled: Boolean,
  },
  methods: {
    emitRole(role: string) {
      this.$emit("check", role);
    },
  },
});
</script>
<style lang="scss" scoped></style>
