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
const refContent = ref<HTMLElement | null>(null)
const refIsScrolling = ref(false)

const onScrollContent = () => {
    if (refContent.value?.scrollTop! > 0) {
        return refIsScrolling.value = true
    }
    refIsScrolling.value = false
}

</script>

<template>
    <NuxtLoadingIndicator color="#D80032" />
    <main class="app">
        <Sidepanel />
        <section ref="refContent" class="content" @scroll="onScrollContent">
            <Header :class="{small: refIsScrolling}" :isSmall="refIsScrolling" />
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
