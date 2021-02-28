<template>
  <div class="container" v-bind="$attrs" v-if="isEventLoaded">
    <EventHeader :event="event" />
    <AnonLoginCard class="mb-5" v-if="!isLoggedIn" />
    <QueueForEvent />
  </div>
  <div class="container" v-else>
    Loading...
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { getEvent, Event } from "@/services/event.service";
import useIsLoading from "@/composables/useLoading";
import EventHeader from "@/components/event/header.vue";
import { useStore } from "vuex";

const QueueForEvent = defineAsyncComponent({
  loader: () => import("@/components/event/queue-for-event.vue"),
});
const AnonLoginCard = defineAsyncComponent({
  loader: () => import("@/components/login/anon-login-card.vue"),
});

export default defineComponent({
  name: "event",
  components: {
    EventHeader,
    QueueForEvent,
    AnonLoginCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { eventUrl } = route.params;
    const event = ref({} as Event);
    const isEventLoaded = computed(() => !!event.value.id);

    const { isLoading } = useIsLoading();

    onMounted(async () => {
      event.value = await getEvent(String(eventUrl));
    });

    return {
      event,
      isLoading,
      isEventLoaded,
      isLoggedIn: computed(() => store.getters.isLoggedIn),
    };
  },
});
</script>
<style lang="scss" scoped></style>
