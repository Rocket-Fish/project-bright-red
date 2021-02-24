<template>
  <navbar />
  <div class="root-padding">
    <router-view />
  </div>
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
.root-padding {
  padding: 10px 0px 10px 10px;
}
</style>
