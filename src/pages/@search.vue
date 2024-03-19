<script setup lang="ts">
const router = useRouter()
const onLeave = () => {
    router.back()
}
</script>

<template>
    <section @click="onLeave" class="search_overlay" />
    <section class="search_container">Hola a todos</section>
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
}
.search_container {
    position: fixed;
    top: 12vh;
    left: calc(50vw - 250px);
    box-sizing: content-box;
    width: 500px;
    height: 550px;
    min-width: 400px;
    background-color: var(--color-background);
    border-radius: 20px;
    z-index: 100;
    padding: 30px;
}
</style>
