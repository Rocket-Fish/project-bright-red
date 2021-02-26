<template>
  <div class="field" v-bind="$attrs">
    <label class="label">Display Name</label>
    <div class="control">
      <input type="text" class="input" v-model="displayName" :disabled="isLoading" />
    </div>
    <p class="help">Other users will recognize you by this name.</p>
  </div>
  <div class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        :class="{ 'is-loading': isLoading }"
        :disabled="isLoading"
        @click="onCreate"
      >
        Create User
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "anonymous-login",
  data() {
    return {
      displayName: "",
      isLoading: false,
      error: "",
    };
  },
  methods: {
    onCreate() {
      console.log("created");
    },
  },
});
</script>
<style lang="scss" scoped></style>
