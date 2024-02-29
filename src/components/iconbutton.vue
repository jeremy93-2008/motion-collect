<script setup lang="ts">
defineProps({
    icon: String,
    size: {
        type: String,
        default: '16px',
    },
})
</script>

<template>
    <button class="iconbutton">
        <img
            class="mr-4"
            :class="`h-[${size}] w-[${size}]`"
            :src="icon"
            alt="icon"
        />
    </button>
</template>

<style scoped>
.iconbutton {
    display: flex;
    flex: 0;
    align-items: center;
    color: var(--color-white);
    padding: 12px;
    border-radius: 100%;
    cursor: pointer;
    border: solid 2px transparent;

    &:hover {
        border: solid 2px var(--color-shade);
    }
    &:active {
        border: solid 2px var(--color-white);
    }
}
</style>
