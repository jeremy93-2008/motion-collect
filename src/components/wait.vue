<script setup lang="ts">
defineProps({
    isLoading: {
        type: Boolean,
        required: true,
    },
})
</script>

<template>
    <div v-if="isLoading" class="wait">
        <img class="loading" src="@/assets/loading.svg" alt="loading" />
    </div>
    <slot v-else />
</template>

<style scoped>
.loading {
    margin-top: 32px;
}
</style>
