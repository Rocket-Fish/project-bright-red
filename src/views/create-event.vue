<template>
  <div class="container">
    <h1 class="title is-1">Create Event</h1>
    <div class="field">
      <label class="label">Number of Parties</label>
      <div class="control">
        <SelectNumOfParties v-model="config.numberOfParties" />
      </div>
    </div>
    <div class="field">
      <label class="label">
        Party Composition
      </label>
      <div class="control">
        <div class="select">
          <select disabled>
            <option>Standard (2t2h2m1r1c)</option>
          </select>
        </div>
      </div>
      <p class="help">Party composition customization coming soon</p>
    </div>
    <div class="field">
      <label class="label">
        Max Number of players in queue
      </label>
      <div class="control">
        <input
          type="number"
          class="input"
          :min="8"
          :max="128"
          v-model="config.maxPlayersInQueue"
        />
      </div>
      <p class="help">Allow a maximum of N players in queue</p>
    </div>
    <div class="field">
      <div class="control">
        <label
          for="auto-form-party"
          class="checkbox"
        >
          <input
            type="checkbox"
            id="auto-form-party"
          >
          Auto form party
        </label>
      </div>
      <p class="help">If a slot is available, immediately pull users into the party from queue.</p>
    </div>
    <div class="field is-grouped">
      <div class="control"><button class="button is-link">Create</button></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SelectNumOfParties from "@/components/select-num-of-parties.vue";

export default defineComponent({
  name: "create-event",
  components: {
    SelectNumOfParties,
  },
  data() {
    return {
      config: {
        numberOfParties: 1,
        maxPlayersInQueue: 100,
      },
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
