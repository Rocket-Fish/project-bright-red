<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <h3 class="title is-3">
        {{ event.name }}
      </h3>
      <h5 class="subtitle">Organized by {{ event.organizer.displayName }}</h5>
      <p>
        Start time:
        {{ event.eventTime.setZone(event.timeZone.toUpperCase()).toFormat("MMMM dd, yyyy - hh:mm a z") }}
      </p>
      <div class="field mt-4">
        <label class="label">Shareable Link</label>
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
import { computed, defineComponent, PropType } from "vue";

import { Event } from "@/services/event.service";

export default defineComponent({
  name: "event-header",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },

  setup(props) {
    const startTime = computed(() => props.event.eventTime.setZone(props.event.timeZone.toUpperCase()).toFormat("MMMM dd, yyyy - hh:mm a z"));
    const currentUrl = computed(() => `https://xivqueue.com/4/${props.event.url}`);
    return {
      startTime,
      currentUrl,
    };
  },
  data() {
    return {
      copyButtonMessage: "Copy",
    };
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
