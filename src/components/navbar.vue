<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item custom-text" :to="{ name: 'home' }">
        XIVQueue
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': showMobileMenu }"
        aria-label="menu"
        aria-expanded="false"
        @click.prevent="onMenuClicked"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showMobileMenu }">
      <!-- hidden on mobile -->
      <div class="navbar-start">
        <router-link class="navbar-item" :to="{ name: 'my-queues' }">
          My Queues
        </router-link>
        <router-link class="navbar-item" :to="{ name: 'create-event' }">
          Create Event
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <router-link :to="authButtonRoute" class="button is-primary">
                <span>{{ authButtonText }}</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "navbar",
  setup() {
    const showMobileMenu = ref(false);
    const onMenuClicked = (): void => {
      showMobileMenu.value = !showMobileMenu.value;
    };

    const store = useStore();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const authButtonText = computed(() => (isLoggedIn.value ? "Logout" : "Login"));
    const authButtonRoute = computed(() => ({ name: isLoggedIn.value ? "logout" : "login" }));

    return {
      showMobileMenu,
      isLoggedIn,
      authButtonText,
      authButtonRoute,

      // methods
      onMenuClicked,
    };
  },
});
</script>
<style lang="scss" scoped>
.custom-text {
  font-size: 1.7rem;
}
</style>
