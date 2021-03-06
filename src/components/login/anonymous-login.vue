<template>
  <div class="field" v-bind="$attrs">
    <label class="label">Display Name</label>
    <div class="control">
      <input
        type="text"
        class="input"
        :class="{ 'is-danger': containsError }"
        v-model="displayName"
        :disabled="isLoading"
        placeholder="Beef Fish (Taco)"
      />
    </div>
    <p class="help" :class="{ 'is-danger': containsError }">
      {{ containsError ? error : "Other users will recognize you by this name." }}
    </p>
  </div>
  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" :class="{ 'is-loading': isLoading }" :disabled="isLoading" @click="onCreateUser">
        Create User
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import useIsLoading from "@/composables/useLoading";
import useError from "@/composables/useError";
import { uniqueNamesGenerator, Config, adjectives, colors, animals, NumberDictionary } from "unique-names-generator";
import { register } from "@/services/auth.service";
import { useStore } from "vuex";

const numbers = NumberDictionary.generate({ min: 1000, max: 9999 });
const customGeneratorConfig: Config = {
  dictionaries: [adjectives, colors, animals, numbers],
  length: 4,
  separator: "-",
};
export default defineComponent({
  name: "anonymous-login",
  emits: ["login"],
  setup(props, { emit }) {
    const { isLoading } = useIsLoading(false);
    const displayName = ref("");
    const { error, containsError } = useError();

    const store = useStore();

    const onCreateUser = async () => {
      isLoading.value = true;
      error.value = "";
      if (displayName.value.length < 2) {
        error.value = "name must be at least 2 characters in length";
      } else if (displayName.value.length > 200) {
        error.value = "name must be at most 200 characters in length";
      } else {
        const username = `anon-${uniqueNamesGenerator(customGeneratorConfig)}`;
        const password = `anon-${uniqueNamesGenerator(customGeneratorConfig)}`;

        try {
          const { id, token, expiresAt } = await register({
            displayName: displayName.value,
            username,
            password,
          });
          await store.dispatch("setUser", {
            id,
            isLoggedIn: true,
            displayName: displayName.value,
            jwt: token,
            jwtExp: expiresAt,
          });
          emit("login");
        } catch (e) {
          // eslint-disable-next-line
          error.value = "An unknown error has occured, please try again.";
        }
      }
      isLoading.value = false;
    };

    return {
      displayName,
      isLoading,
      error,
      containsError,

      // methods
      onCreateUser,
    };
  },
});
</script>
<style lang="scss" scoped></style>
