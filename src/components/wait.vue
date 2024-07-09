<script setup lang="ts">
defineProps({
    isLoading: {
        type: Boolean,
        required: true,
    },
    size: {
        type: Number,
        default: 32,
    },
    overlay: {
        type: Boolean,
        default: false,
    },
    overlayPortal: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <template v-if="!overlay && !overlayPortal">
        <div v-if="isLoading" class="wait">
            <img
                class="loading"
                :style="{ width: `${size}px`, height: `${size}px` }"
                src="@/assets/loading.svg"
                alt="loading"
            />
        </div>
        <slot v-else />
    </template>
    <template v-else-if="overlayPortal">
        <div v-if="isLoading" class="wait overlay-portal">
            <img class="loading" src="@/assets/loading.svg" alt="loading" />
        </div>
        <slot v-else />
    </template>
    <template v-else>
        <div v-if="isLoading" class="wait overlay">
            <img class="loading" src="@/assets/loading.svg" alt="loading" />
        </div>
        <slot />
    </template>
</template>
<style scoped>
.wait.overlay {
    position: absolute;
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
.wait.overlay-portal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}
</style>
