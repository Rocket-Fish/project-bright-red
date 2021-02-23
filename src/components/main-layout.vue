<template>
  <navbar />
  <router-view />
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

const navbar = defineAsyncComponent({
  loader: () => import("@/components/navbar.vue"),
  delay: 0,
  timeout: 3000,
});

export default defineComponent({
  name: "main-layout",
  components: {
    navbar,
  },
});
</script>
<style lang="scss" scoped>
</style>
