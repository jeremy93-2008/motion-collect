<script lang="ts" setup>
import '@/styles/base.css'
import Sidepanel from '~/components/sidepanel/sidepanel.vue'
import Header from '~/components/default/header.vue'
useHead({
    title: 'Motion Collect',
    meta: [
        {
            name: 'description',
            content: 'A website for collecting movies and TV shows.',
        },
    ],
})
</script>

<template>
    <NuxtLoadingIndicator />
    <main class="app">
        <Sidepanel />
        <section class="content">
            <Header />
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
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 0 20px 8px;
}
</style>
