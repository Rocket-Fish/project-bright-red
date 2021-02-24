<template>
  <div class="container">
    <div class="columns is-desktop">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'event-admin',
  mounted() {
    console.log('route params', this.$route.params);
  },
});
</script>
<style lang="scss" scoped>
</style>
