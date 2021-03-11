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
import { getEvent, Event } from "@/services/event.service";
import useIsLoading from "@/composables/useLoading";
import EventHeader from "@/components/event/header.vue";
import { useStore } from "vuex";
import { io } from "socket.io-client";

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
        const socket = io(process.env.VUE_APP_BACKEND_URL);
        socket.emit("join", event.value.url);
        socket.on("joined-queue", (data) => {
          event.value.queue.push(data);
        });
        socket.on("left-queue", (data) => {
          event.value.queue = event.value.queue.filter((candidate) => candidate.id !== data.id);
        });
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
