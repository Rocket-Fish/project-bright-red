<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "event",
  mounted() {
    console.log("route params", this.$route.params);
  },
});
</script>
<style lang="scss" scoped>
</style>
