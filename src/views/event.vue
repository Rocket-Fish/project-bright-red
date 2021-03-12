<template>
  <div class="container" v-bind="$attrs" v-if="isEventLoaded">
    <EventHeader class="mb-5" :event="event" />
    <AnonLoginCard class="mb-5" v-if="!isLoggedIn" />
    <QueueForEvent class="mb-5" :event="event" v-else />
    <PartyList class="mb-5" v-model:event="event" :isAdmin="isAdmin" />
  </div>
  <div class="container" v-else>
    Loading...
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed, defineAsyncComponent, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { getEvent, Event, parseEvent } from "@/services/event.service";
import useIsLoading from "@/composables/useLoading";
import EventHeader from "@/components/event/header.vue";
import { useStore } from "vuex";
import { io } from "socket.io-client";
import convert from "@/services/camel.service";

const QueueForEvent = defineAsyncComponent({
  loader: () => import("@/components/event/queue-for-event.vue"),
});
const AnonLoginCard = defineAsyncComponent({
  loader: () => import("@/components/login/anon-login-card.vue"),
});
const PartyList = defineAsyncComponent({
  loader: () => import("@/components/event/party-list.vue"),
});

export default defineComponent({
  name: "event",
  components: {
    EventHeader,
    QueueForEvent,
    AnonLoginCard,
    PartyList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { eventUrl, action } = route.params;
    const isAdmin = computed(() => action === "admin");
    const event = ref({} as Event);
    const isEventLoaded = computed(() => !!event.value.id);

    const { isLoading } = useIsLoading();

    const refreshEvent = async () => {
      event.value = await getEvent(String(eventUrl));
    };

    onMounted(() => {
      refreshEvent().then(() => {
        if (typeof window !== "undefined") {
          const socket = io(process.env.VUE_APP_BACKEND_URL);
          socket.emit("join", event.value.url);
          socket.on("joined-queue", (data) => {
            event.value.queue.push(convert(data));
          });
          socket.on("left-queue", (data) => {
            event.value.queue = event.value.queue.filter((candidate) => candidate.id !== data.id);
          });
          socket.on("update-event", (e) => {
            console.log(e);
            event.value = parseEvent(e);
          });
        }
      });
    });

    return {
      event,
      isLoading,
      isEventLoaded,
      isAdmin,
      isLoggedIn: computed(() => store.getters.isLoggedIn),
    };
  },
});
</script>
<style lang="scss" scoped></style>
