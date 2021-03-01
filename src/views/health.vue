<template>
  <div class="container">
    <h1 class="title is-1">
      Health
    </h1>
    <pre>{{ health }}</pre>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { healthCheck } from "@/services/health.service";

export default defineComponent({
  name: "health",
  data() {
    return {
      health: {},
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData(): Promise<void> {
      try {
        this.health = await healthCheck();
      } catch (e) {
        this.health = e;
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
