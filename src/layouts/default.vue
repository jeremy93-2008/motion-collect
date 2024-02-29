<script lang="ts" setup>
  import "@/styles/base.css";
  import Sidepanel from "@/components/sidepanel.vue";
  useHead({
    title: "Motion Collect",
    meta: [
      {
        name: "description",
        content: "A website for collecting movies and TV shows."
      }
    ]
  });
</script>

<template>
  <main class="app">
    <Sidepanel />
    <section class="content">
      <slot />
    </section>
  </main>
</template>

<style scoped>
  .app {
    display: flex;
    flex-direction: row;
    height: 100vh;
    background: var(--color-background);
    color: var(--color-white);
  }
 
  .content {
    flex: 1;
    padding: 20px;
  }
</style>