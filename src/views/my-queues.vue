<template>
  <div class="container">
    <h1 class="title is-1">My Queues</h1>
    <div class="columns">
      <div class="column">
        <EventCard />
      </div>
      <div class="column">
        <EventCard />
      </div>
      <div class="column">
        <EventCard />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

const EventCard = defineAsyncComponent({
  loader: () => import("@/components/event-card.vue"),
});

export default defineComponent({
  name: "my-queues",
  components: {
    EventCard,
  },
  setup() {
    const store = useStore();
  },
});
</script>
<style lang="scss" scoped></style>
