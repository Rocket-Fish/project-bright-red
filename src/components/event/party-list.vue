<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <div class="is-flex is-justify-content-space-between mb-5">
        <div class="is-flex-grow-1">
          <h3 class="title is-3">Party Roster</h3>
          <h5 class="subtitle">Active party roster will be displayed below</h5>
        </div>
        <div v-if="isAdmin">
          <button class="button is-primary" :class="{ 'is-loading': isLoading }" @click="onFormParty" :disabled="isLoading">
            Form Party
          </button>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column" v-for="party of event.parties" :key="`party-${party.id}`">
          <aside class="menu">
            <p class="menu-label">party {{ party.partyNumber }}</p>
            <ul class="menu-list">
              <li v-if="party.candidates.length === 0">
                <a class="custom-menu-item">
                  <div class="left">
                    <p>
                      [No Members Present]
                    </p>
                  </div>
                </a>
              </li>
              <li v-for="candidate of party.candidates" :key="`candidate-${candidate.id}`">
                <a class="custom-menu-item">
                  <div class="left">
                    <p>
                      {{ candidate.user.displayName }}
                    </p>
                  </div>
                  <div class="right">
                    {{ candidate.activeRole }}
                  </div>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Event, formParty } from "@/services/event.service";
import useIsLoading from "@/composables/useLoading";

export default defineComponent({
  name: "party-list",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
    isAdmin: Boolean,
  },
  emits: ["update:event"],
  setup(props, { emit }) {
    const { isLoading } = useIsLoading();

    const onFormParty = async () => {
      try {
        isLoading.value = true;
        const updatedEvent = await formParty(props.event.id);
        await emit("update:event", updatedEvent);
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      onFormParty,
      isLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
.custom-menu-item {
  display: flex;
  justify-content: space-between;

  .left {
    flex: 1 1 0;
    max-width: 200px;
    min-width: 0;
    display: block;
    & > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }

  .right {
    flex-shrink: 0;
    padding: 0 0 0 5px;
  }
}
</style>
