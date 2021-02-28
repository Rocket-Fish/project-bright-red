<template>
  <div class="card mb-5">
    <div class="card-content">
      <h3 class="title is-3">
        {{ event.name }}
      </h3>
      <h5 class="subtitle">Organized by {{ event.organizer.displayName }}</h5>
      <p>
        {{
          event.eventTime
            .setZone(event.timeZone.toUpperCase())
            .toFormat("MMMM dd, yyyy - hh:mm a z")
        }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Event } from "@/services/event.service";

export default defineComponent({
  name: "event-header",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped></style>
