<template>
  <div class="container">
    <h1 class="title is-1">My Queues</h1>
    <div class="columns is-multiline" v-if="!hasEvents">
      <div class="column" v-for="event of myEvents" :key="`event-${event.id}`">
        <EventCard :event="event" />
      </div>
    </div>
    <p v-else>Not registered for any events.</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref, computed } from "vue";
import { Event, getEventsList } from "@/services/event.service";

const EventCard = defineAsyncComponent({
  loader: () => import("@/components/event-card.vue"),
});

interface NumToEvent {
  [n: number]: Event;
}

export default defineComponent({
  name: "my-queues",
  components: {
    EventCard,
  },
  setup() {
    const myEvents = ref([] as Event[]);
    const hasEvents = computed(() => myEvents.value.length <= 0);

    onMounted(async () => {
      try {
        const { organizedEvents, participatingEvents } = await getEventsList();
        const mapEvents = {} as NumToEvent;
        organizedEvents.forEach((ev) => {
          mapEvents[ev.id] = ev;
        });
        participatingEvents.forEach((ev) => {
          mapEvents[ev.id] = ev;
        });

        myEvents.value = Object.keys(mapEvents).map((key) => mapEvents[Number(key)]);
      } catch (e) {
        myEvents.value = [];
      }
    });

    return {
      hasEvents,
      myEvents,
    };
  },
});
</script>
<style lang="scss" scoped></style>
