<template>
  <div class="container">
    <h1 class="title is-1">Create Event</h1>
    <div class="field">
      <label class="label"> Event Name </label>
      <div class="control">
        <input
          type="text"
          class="input"
          :class="{ 'is-danger': fields.name.isError }"
          v-model="config.name"
          :disabled="isLoading"
          placeholder="Delubrum Reginae (Savage)"
        />
      </div>
      <p class="help" :class="{ 'is-danger': fields.name.isError }">
        {{ getHelpText(fields.name) }}
      </p>
    </div>
    <div class="field">
      <label class="label">When is it?</label>
      <div class="field is-grouped">
        <div class="control">
          <input
            type="date"
            class="input"
            v-model="config.date"
            :disabled="isLoading"
            :class="{ 'is-danger': fields.eventTime.isError }"
          />
        </div>
        <div class="control">
          <input
            type="time"
            class="input"
            v-model="config.time"
            :disabled="isLoading"
            :class="{ 'is-danger': fields.eventTime.isError }"
          />
        </div>
        <div class="control">
          <div class="select" :class="{ 'is-danger': fields.eventTime.isError }">
            <select v-model="config.timeZone" :disabled="isLoading">
              <option v-for="zone of timeZones" :key="zone">{{ zone }}</option>
            </select>
          </div>
        </div>
      </div>
      <p class="help" :class="{ 'is-danger': fields.eventTime.isError }">
        {{ getHelpText(fields.eventTime) }}
      </p>
    </div>
    <div class="field">
      <label class="label">Number of Parties</label>
      <div class="control">
        <SelectNumOfParties v-model="config.numberOfParties" :disabled="isLoading" />
      </div>
      <p class="help" :class="{ 'is-danger': fields.numberOfParties.isError }">
        {{ getHelpText(fields.numberOfParties) }}
      </p>
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
          :class="{ 'is-danger': fields.maxPlayersInQueue.isError }"
          v-model="config.maxPlayersInQueue"
          :disabled="isLoading"
        />
      </div>
      <p class="help" :class="{ 'is-danger': fields.maxPlayersInQueue.isError }">
        {{ getHelpText(fields.maxPlayersInQueue) }}
      </p>
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

interface FieldsToNotice {
  [k: string]: Notice;
}
interface Notice {
  isError: boolean;
  error: string;
  help: string;
}
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
      fields: {
        name: {
          isError: false,
          error: "Name is required, and can have a maximum of 50 characters",
          help: "",
        },
        numberOfParties: {
          isError: false,
          error:
            "IDK how you selected this option but only 1 3 6 and 7 parties are supported at the moment",
          help: "",
        },
        maxPlayersInQueue: {
          isError: false,
          error: "This number must be between 8 and 128",
          help: "Allow a maximum of N players in queue",
        },
        eventTime: {
          isError: false,
          error: "Unless you have a time machine, you cannot select a time in the past",
          help:
            "Note: Safari and IE does not support input date/time. Local timezone referes to your system timezone.",
        },
      } as FieldsToNotice,
    };
  },
  methods: {
    resetErrors(): void {
      this.fields = Object.entries(this.fields).reduce((acc: FieldsToNotice, [key, value]) => {
        acc[key] = { ...value, isError: false } as Notice;
        return acc;
      }, {} as FieldsToNotice);
    },
    getHelpText({ isError, error, help }: Notice): string {
      return isError ? error : help;
    },
    async onCreate(): Promise<void> {
      this.resetErrors();
      this.isLoading = true;
      try {
        const result = await createEvent(this.config);
        console.log(result);
      } catch (e) {
        console.log(e);
        const { errors } = e;
        errors.forEach((item: any) => {
          if (!!item.field && !!this.fields[item.field]) {
            this.fields[item.field] = { ...this.fields[item.field], isError: true };
          }
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
