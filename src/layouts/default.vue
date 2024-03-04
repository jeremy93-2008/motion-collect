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
const isScrolling = useState<boolean>('isScrolling', () => false)
const scrollElement = useState<HTMLElement | null>('scrollElement', () => null)

const onScrollContent = () => {
    if (scrollElement.value?.scrollTop! > 0) {
        return (isScrolling.value = true)
    }
    isScrolling.value = false
}
</script>

<template>
    <NuxtLoadingIndicator color="#D80032" />
    <main class="app">
        <Sidepanel />
        <section ref="scrollElement" class="content" @scroll="onScrollContent">
            <Header :class="{ small: isScrolling }" :isSmall="isScrolling" />
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
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 0 20px 8px;
}
</style>
