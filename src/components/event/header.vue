<template>
  <div class="card mb-5">
    <div class="card-content">
      <h3 class="title is-3">
        {{ event.name }}
      </h3>
      <h5 class="subtitle">Organized by {{ event.organizer.displayName }}</h5>
      <p>
        Start time:
        {{
          event.eventTime
            .setZone(event.timeZone.toUpperCase())
            .toFormat("MMMM dd, yyyy - hh:mm a z")
        }}
      </p>
      <div class="field mt-4">
        <label class="label">Sharable Link</label>
        <div class="field has-addons">
          <div class="control" style="flex-grow: 1">
            <input type="text" class="input" readonly="true" ref="copyfield" :value="currentUrl" />
          </div>
          <div class="control">
            <button class="button is-info" @click="copy">
              {{ copyButtonMessage }}
            </button>
          </div>
        </div>
      </div>
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
  data() {
    return {
      copyButtonMessage: "Copy",
    };
  },
  computed: {
    currentUrl(): string {
      return window.location.href;
    },
  },
  methods: {
    copy() {
      const copyField = this.$refs.copyfield as HTMLInputElement;
      copyField.select();
      copyField.setSelectionRange(0, 9999);
      document.execCommand("copy");
      this.copyButtonMessage = "Copied";
    },
  },
});
</script>
<style lang="scss" scoped></style>
