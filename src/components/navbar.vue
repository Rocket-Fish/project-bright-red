<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'home' }">
        <img src="@/assets/qmeup.png" alt="Logo" width="112" height="28" />
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
              <router-link :to="{ name: 'login' }" class="button is-primary">
                <span>Login</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "navbar",
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    onMenuClicked(): void {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
});
</script>
<style lang="scss" scoped></style>
