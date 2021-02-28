<template>
  <div class="container">
    <EventHeader :event="event" v-if="isEventLoaded" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getEvent, Event } from "@/services/event.service";
import useIsLoading from "@/composables/useLoading";
import EventHeader from "@/components/event/header.vue";

export default defineComponent({
  name: "event-admin",
  components: {
    EventHeader,
  },
  setup() {
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
    };
  },
});
</script>
<style lang="scss" scoped></style>
