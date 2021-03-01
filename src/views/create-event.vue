<template>
  <div class="container">
    <h1 class="title is-1">Create Event</h1>

    <AnonLoginCard class="mb-4" v-if="!isLoggedIn" />

    <div class="field">
      <label class="label"> Event Name </label>
      <div class="control">
        <input
          type="text"
          class="input"
          :class="{ 'is-danger': fieldsToHelp.name.isError }"
          v-model="config.name"
          :disabled="isLoading"
          placeholder="Delubrum Reginae (Savage)"
        />
      </div>
      <p class="help" :class="{ 'is-danger': fieldsToHelp.name.isError }">
        {{ getHelpText(fieldsToHelp.name) }}
      </p>
    </div>
    <div class="field">
      <label class="label">When is it?</label>
      <div class="field is-grouped">
        <div class="control">
          <input type="date" class="input" v-model="config.date" :disabled="isLoading" :class="{ 'is-danger': fieldsToHelp.eventTime.isError }" />
        </div>
        <div class="control">
          <input type="time" class="input" v-model="config.time" :disabled="isLoading" :class="{ 'is-danger': fieldsToHelp.eventTime.isError }" />
        </div>
        <div class="control">
          <div class="select" :class="{ 'is-danger': fieldsToHelp.eventTime.isError }">
            <select v-model="config.timeZone" :disabled="isLoading">
              <option v-for="zone of timeZones" :key="`zone-${zone}`">{{ zone }}</option>
            </select>
          </div>
        </div>
      </div>
      <p class="help" :class="{ 'is-danger': fieldsToHelp.eventTime.isError }">
        {{ getHelpText(fieldsToHelp.eventTime) }}
      </p>
    </div>
    <div class="field">
      <label class="label">Number of Parties</label>
      <div class="control">
        <SelectNumOfParties v-model="config.numberOfParties" :disabled="isLoading" />
      </div>
      <p class="help" :class="{ 'is-danger': fieldsToHelp.numberOfParties.isError }">
        {{ getHelpText(fieldsToHelp.numberOfParties) }}
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
          :class="{ 'is-danger': fieldsToHelp.maxPlayersInQueue.isError }"
          v-model="config.maxPlayersInQueue"
          :disabled="isLoading"
        />
      </div>
      <p class="help" :class="{ 'is-danger': fieldsToHelp.maxPlayersInQueue.isError }">
        {{ getHelpText(fieldsToHelp.maxPlayersInQueue) }}
      </p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" :class="{ 'is-loading': isLoading }" :disabled="isLoading || !isLoggedIn" @click="onCreateEvent">
          Create Event
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
import SelectNumOfParties from "@/components/select-num-of-parties.vue";
import { EventConfig, createEvent } from "@/services/event.service";

import useIsLoading from "@/composables/useLoading";
import useTime, { SupportedTimeZones } from "@/composables/event/useTime";
import useHelp from "@/composables/event/create/useHelp";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const AnonLoginCard = defineAsyncComponent({
  loader: () => import("@/components/login/anon-login-card.vue"),
});

export default defineComponent({
  name: "create-event",
  components: {
    SelectNumOfParties,
    AnonLoginCard,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { timeZones, dateNow } = useTime();

    const { isLoading } = useIsLoading();

    // event fieldsToHelp information
    const { fieldsToHelp, getHelpText, resetErrors } = useHelp();

    // event config information
    const config = ref({
      name: "",
      numberOfParties: 1,
      maxPlayersInQueue: 100,
      time: dateNow.value.toFormat("HH:mm"),
      date: dateNow.value.toFormat("yyyy-MM-dd"),
      timeZone: SupportedTimeZones.est,
    } as EventConfig);

    const onCreateEvent = async (): Promise<void> => {
      resetErrors();
      isLoading.value = true;

      try {
        const { url } = await createEvent(config.value);
        router.push({ name: "event", params: { eventUrl: url, action: "admin" } });
      } catch (e) {
        const { errors } = e;
        // eslint-disable-next-line
        errors.forEach((item: any) => {
          if (!!item.field && !!fieldsToHelp.value[item.field]) {
            fieldsToHelp.value[item.field] = {
              ...fieldsToHelp.value[item.field],
              isError: true,
            };
          }
        });
      } finally {
        isLoading.value = false;
      }
    };

    return {
      timeZones,
      config,
      fieldsToHelp,
      isLoading,
      isLoggedIn: computed(() => store.getters.isLoggedIn),

      // methods
      resetErrors,
      getHelpText,
      onCreateEvent,
    };
  },
});
</script>
<style lang="scss" scoped></style>
