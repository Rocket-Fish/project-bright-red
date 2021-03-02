<template>
  <div class="container">
    <div class="card" v-bind="$attrs">
      <div class="card-content">
        <p class="title is-4">Login</p>
        <p class="subtitle is-6">What would you like to be referred to?</p>
        <AnonymousLogin @login="onLogin()" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AnonymousLogin from "@/components/login/anonymous-login.vue";

export default defineComponent({
  name: "login",
  components: {
    AnonymousLogin,
  },
  methods: {
    onLogin() {
      this.$router.push({ name: "my-queues" });
    },
  },
});
</script>
<style lang="scss" scoped></style>
