<template>
  <div class="card custom-card">
    <div class="card-content">
      <h3 class="title is-3">
        {{ event.name }}
      </h3>
      <h5 class="subtitle">Organized by {{ event.organizer.displayName }}</h5>
      <p>
        Start time:
        {{ event.eventTime.setZone(event.timeZone.toUpperCase()).toFormat("MMMM dd, yyyy - hh:mm a z") }}
      </p>
    </div>
    <div class="card-footer">
      <router-link :to="{ name: 'event', params: { eventUrl: event.url } }" class="card-footer-item">
        Details
      </router-link>
      <router-link :to="{ name: 'event', params: { eventUrl: event.url, action: 'admin' } }" class="card-footer-item" v-if="isAdimn">
        Admin
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { Event } from "@/services/event.service";

export default defineComponent({
  name: "event-card",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const userId = computed(() => store.getters.user.id);
    const isAdimn = props.event.organizer.id === userId.value;

    return { isAdimn };
  },
});
</script>
<style lang="scss" scoped>
.custom-card {
  min-width: 320px;
}
</style>
