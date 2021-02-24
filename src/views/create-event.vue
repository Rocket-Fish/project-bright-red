<template>
  <div class="container">
    <h1 class="title is-1">Create Event</h1>
    <div class="field"><label class="label">
        Event Name
      </label>
      <div class="control"><input
          type="text"
          class="input"
          v-model="config.name"
          placeholder="Delubrum Reginae (Savage)"
        ></div>
    </div>
    <div class="field">
      <label class="label">When is it?</label>
      <div class="field is-grouped">
        <div class="control">
          <input
            type="date"
            class="input"
            v-model="config.date"
          />
        </div>
        <div class="control">
          <input
            type="time"
            class="input"
            v-model="config.time"
          />
        </div>
        <div class="control">
          <div class="select">
            <select v-model="config.timeZone">
              <option
                v-for="zone of timeZones"
                :key="zone"
              >{{zone}}</option>
            </select>
          </div>
        </div>
      </div>
      <p class="help">Note: Safari and IE does not support input date/time</p>
    </div>
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
import { DateTime } from "luxon";

export default defineComponent({
  name: "create-event",
  components: {
    SelectNumOfParties,
  },
  data() {
    return {
      timeZones: ["est", "pst", "cst", "mst", "utc"],
      config: {
        name: "",
        numberOfParties: 1,
        maxPlayersInQueue: 100,
        time: DateTime.now().setZone("local").toFormat("HH:mm"),
        date: DateTime.now().setZone("local").toFormat("yyyy-MM-dd"),
        autoFormParty: false,
        timeZone: "est",
      },
    };
  },
  mounted() {
    console.log(DateTime.local().setZone("utc").isValid);
  },
});
</script>
<style lang="scss" scoped>
</style>
