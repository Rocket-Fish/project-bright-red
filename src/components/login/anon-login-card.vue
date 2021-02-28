<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <p class="title is-4">You are not logged in.</p>
      <p class="subtitle is-6">Please create an anonymous user before continuing.</p>
      <AnonymousLogin />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

const AnonymousLogin = defineAsyncComponent({
  loader: () => import("@/components/login/anonymous-login.vue"),
});

export default defineComponent({
  components: {
    AnonymousLogin,
  },
});
</script>
