<template>
  <div class="container">
    <h1 class="title is-1">Create Event</h1>
    <div class="field">
      <label class="label"> Event Name </label>
      <div class="control">
        <input
          type="text"
          class="input"
          v-model="config.name"
          :disabled="isLoading"
          placeholder="Delubrum Reginae (Savage)"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">When is it?</label>
      <div class="field is-grouped">
        <div class="control">
          <input type="date" class="input" v-model="config.date" :disabled="isLoading" />
        </div>
        <div class="control">
          <input type="time" class="input" v-model="config.time" :disabled="isLoading" />
        </div>
        <div class="control">
          <div class="select">
            <select v-model="config.timeZone" :disabled="isLoading">
              <option v-for="zone of timeZones" :key="zone">{{ zone }}</option>
            </select>
          </div>
        </div>
      </div>
      <p class="help">
        Note: Safari and IE does not support input date/time. Local timezone referes to your system
        timezone.
      </p>
    </div>
    <div class="field">
      <label class="label">Number of Parties</label>
      <div class="control">
        <SelectNumOfParties v-model="config.numberOfParties" :disabled="isLoading" />
      </div>
    </div>
    <div class="field">
      <label class="label"> Party Composition </label>
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
      <label class="label"> Max Number of players in queue </label>
      <div class="control">
        <input
          type="number"
          class="input"
          :min="8"
          :max="128"
          v-model="config.maxPlayersInQueue"
          :disabled="isLoading"
        />
      </div>
      <p class="help">Allow a maximum of N players in queue</p>
    </div>
    <div class="field">
      <div class="control">
        <label for="auto-form-party" class="checkbox">
          <input type="checkbox" id="auto-form-party" :disabled="isLoading" />
          Auto form party
        </label>
      </div>
      <p class="help">
        If a slot is available, immediately pull users into the party from queue.
      </p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :class="{ 'is-loading': isLoading }"
          :disabled="isLoading"
          @click="onCreate"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SelectNumOfParties from "@/components/select-num-of-parties.vue";
import { DateTime } from "luxon";
import { EventConfig, createEvent } from "@/services/event.service";

export default defineComponent({
  name: "create-event",
  components: {
    SelectNumOfParties,
  },
  setup() {
    // warning: not setting up ref here will loose reactivity
    // but available timeZones are static ATM
    const timeZones = ["local", "est", "pst", "cst", "mst", "utc"];
    const defaultZone = timeZones[0];
    const dateNow = DateTime.now().setZone(defaultZone);
    return {
      timeZones,
      config: {
        name: "",
        numberOfParties: 1,
        maxPlayersInQueue: 100,
        time: dateNow.toFormat("HH:mm"),
        date: dateNow.toFormat("yyyy-MM-dd"),
        autoFormParty: false,
        timeZone: "local",
      } as EventConfig,
    };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async onCreate(): Promise<void> {
      try {
        this.isLoading = true;
        const result = await createEvent(this.config);
        console.log(result);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
