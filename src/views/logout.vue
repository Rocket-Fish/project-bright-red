<template>
  <div class="container">
    <h1 class="title is-1">Logout</h1>
    <h5 class="subtitle">Are you sure? Anonymous users cannot log back into the same account</h5>
    <p>You will loose access to any events you may be queuing up for.</p>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="onConfirmLogout">
          Yes, Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const onConfirmLogout = () => {
      store.dispatch("logoutUser");
      router.push({ name: "home" });
    };

    return {
      onConfirmLogout,
    };
  },
});
</script>
<style lang="scss" scoped></style>
