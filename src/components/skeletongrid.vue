<script setup lang="ts"></script>

<template>
    <div role="status" class="grid animate-pulse">
        <noimage v-for="i in 8" />
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    margin: 0 24px 0 16px;
}
</style>
