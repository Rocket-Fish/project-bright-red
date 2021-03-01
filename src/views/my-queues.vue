<template>
  <div class="container" v-if="!isLoading">
    <h1 class="title is-1">My Queues</h1>
    <h3 class="subtitle is-3">Events you have queued up for</h3>
    <div v-if="hasFutureEvents">
      <div class="columns is-multiline">
        <div class="column" v-for="event of futureEvents" :key="`f-event-${event.id}`">
          <EventCard :event="event" />
        </div>
      </div>
    </div>
    <p v-else>Not registered for any events.</p>
    <div v-if="hasPastEvents">
      <h3 class="subtitle is-3 mt-6">Past Events</h3>
      <div class="columns is-multiline">
        <div class="column" v-for="event of pastEvents" :key="`p-event-${event.id}`">
          <EventCard :event="event" />
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    Loading...
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref, computed } from "vue";
import { Event, getEventsList } from "@/services/event.service";
import useIsLoading from "@/composables/useLoading";
import { DateTime } from "luxon";

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
    const { isLoading } = useIsLoading(true);
    const currentTime = ref(DateTime.now());
    const myEvents = ref([] as Event[]);
    const futureEvents = computed(() => {
      const future = myEvents.value.reduce((acc: Event[], e: Event) => {
        if (currentTime.value.toMillis() <= e.eventTime.toMillis()) {
          acc.push(e);
        }
        return acc;
      }, [] as Event[]);
      return future;
    });
    const pastEvents = computed(() => {
      const past = myEvents.value.reduce((acc: Event[], e: Event) => {
        if (currentTime.value.toMillis() > e.eventTime.toMillis()) {
          acc.push(e);
        }
        return acc;
      }, [] as Event[]);
      return past;
    });
    const hasFutureEvents = computed(() => futureEvents.value.length > 0);
    const hasPastEvents = computed(() => pastEvents.value.length > 0);

    onMounted(async () => {
      isLoading.value = true;
      try {
        const { organizedEvents, participatingEvents } = await getEventsList();
        const mapEvents = {} as NumToEvent;
        organizedEvents.forEach((ev) => {
          mapEvents[ev.id] = ev;
        });
        participatingEvents.forEach((ev) => {
          mapEvents[ev.id] = ev;
        });
        const combinedEvents = Object.keys(mapEvents).map((key) => mapEvents[Number(key)]);

        myEvents.value = combinedEvents.sort((e1: Event, e2: Event) => e1.eventTime.toMillis() - e2.eventTime.toMillis());
      } catch (e) {
        myEvents.value = [];
      } finally {
        isLoading.value = false;
      }
    });

    return {
      hasFutureEvents,
      isLoading,
      currentTime,
      futureEvents,
      pastEvents,
      hasPastEvents,
    };
  },
});
</script>
<style lang="scss" scoped></style>
