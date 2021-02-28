<template>
  <div class="card" v-bind="$attrs">
    <div class="card-content">
      <h3 class="title is-3">Party Roster</h3>
      <h5 class="subtitle">Active party roster will be displayed below</h5>
      <div class="columns is-multiline">
        <div class="column" v-for="party of event.parties" :key="party.id">
          <aside class="menu">
            <p class="menu-label">party {{ party.partyNumber }}</p>
            <ul class="menu-list">
              <li v-for="[i, p] of JSON.parse(party.partyComp).entries()" :key="i">
                <a class="custom-menu-item">
                  <div class="left">
                    <h2>
                      Placeholder Name
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

import { Event } from "@/services/event.service";

export default defineComponent({
  name: "party-list",
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.custom-menu-item {
  display: flex;
  justify-content: space-between;

  .left {
    flex: 1 1 0;
    max-width: 120px;
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
