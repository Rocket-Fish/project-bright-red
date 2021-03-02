<template>
  <div class="content container">
    <h1>
      This is a home page
    </h1>
    <p>
      This is a queue tool to queue large amounts of FFXIV players into limited number of party slots
      <br />
      <br />
      This tool is still in beta, so many QOL features may be missing.
    </p>
  </div>
  <teleport to="head">
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:title" content="XIV Queue Tool" />
    <meta property="twitter:description" content="organize parties simplified" />
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "home",
});
</script>
