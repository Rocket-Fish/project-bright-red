<template>
  <div class="select">
    <select :value="mapNumberToText[modelValue]" @change="onSelectionChanged" v-bind="$attrs">
      <option v-for="{ number, text } of allowedNumberOfParties" :key="`anop-${number}`">
        {{ text }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

interface TextToNumber {
  [text: string]: number;
}

interface NumberToText {
  [num: number]: string;
}

export default defineComponent({
  name: "select-num-of-parties",
  data() {
    return {
      allowedNumberOfParties: [
        { number: 1, text: "1 Party (8 People)" },
        { number: 3, text: "3 Parties (24 People)" },
        { number: 6, text: "6 Parties (48 People)" },
        { number: 7, text: "7 Parties (56 People)" },
      ],
    };
  },
  props: {
    modelValue: Number,
  },
  emits: ["update:modelValue"],
  computed: {
    mapTextToNumber(): TextToNumber {
      const result = {} as TextToNumber;

      this.allowedNumberOfParties.forEach(({ text, number }) => {
        result[text] = number;
      });
      return result;
    },
    mapNumberToText(): NumberToText {
      const result = {} as NumberToText;

      this.allowedNumberOfParties.forEach(({ text, number }) => {
        result[number] = text;
      });
      return result;
    },
  },
  methods: {
    onSelectionChanged(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.$emit("update:modelValue", this.mapTextToNumber[target.value]);
    },
  },
});
</script>
<style lang="scss" scoped></style>
