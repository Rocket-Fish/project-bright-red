<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <div class="is-flex is-justify-content-space-between mb-5">
        <div class="is-flex-grow-1">
          <h3 class="title is-3">Party Roster</h3>
          <h5 class="subtitle">Active party roster will be displayed below</h5>
        </div>
        <div v-if="isAdmin">
          <button class="button is-primary" @click="onFormParty">
            Form Party
          </button>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column" v-for="party of event.parties" :key="party.id">
          <aside class="menu">
            <p class="menu-label">party {{ party.partyNumber }}</p>
            <ul class="menu-list">
              <li v-for="[i, p] of JSON.parse(party.partyComp).entries()" :key="i">
                <a class="custom-menu-item">
                  <div class="left">
                    <h2>
                      Placeholder Name really long long
                    </h2>
                  </div>
                  <div class="right">
                    {{ p }}
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

export default defineComponent({
  name: "party-list",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
    isAdmin: Boolean,
  },
  setup(props) {
    const onFormParty = async () => {
      const result = await formParty(props.event.id);
      console.log(result);
    };

    return {
      onFormParty,
    };
  },
  methods: {},
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
    & > h2 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }

  .right {
    flex-shrink: 0;
  }
}
</style>
