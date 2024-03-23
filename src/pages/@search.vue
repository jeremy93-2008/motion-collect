<script setup lang="ts">
import Input from '~/components/search/input.vue'
import { useOverlayEvent } from '~/composables/useOverlayEvent'

const { onLeave } = useOverlayEvent()

const onSearchChange = (val: string) => {
    console.log(val)
}
</script>

<template>
    <section @click="onLeave" class="search_overlay" />
    <section class="search_container">
        <Input @on-change="onSearchChange" />
    </section>
</template>

<style scoped>
.search_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.15s linear both;
}
.search_container {
    position: fixed;
    top: 12vh;
    left: calc(50vw - 250px);
    box-sizing: content-box;
    width: 500px;
    min-height: 50px;
    max-height: 550px;
    min-width: 400px;
    background-color: var(--color-background);
    border-radius: 20px;
    z-index: 100;
    padding: 30px;
    animation: slideToTop 0.2s linear both;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes slideToTop {
    0% {
        transform: translateY(-10%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
