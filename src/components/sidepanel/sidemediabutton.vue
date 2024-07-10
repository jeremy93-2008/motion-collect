<script setup lang="ts">
import Text from '~/components/text.vue'

defineProps({
    leftIcon: String,
    selected: Boolean,
    tooltipContent: String,
})
defineEmits(['click'])
</script>

<template>
    <button @click="$emit('click')" class="button" :class="{ selected }">
        <img class="h-[16px] w-[16px] mr-4" :src="leftIcon" alt="icon" />
        <Text :tooltip-content="tooltipContent"><slot /></Text>
    </button>
</template>

<style scoped>
.button {
    display: flex;
    width: 100%;
    align-items: center;
    color: var(--color-white);
    padding: 8px 18px;
    border-radius: 48px;
    cursor: pointer;
    border: 2px solid transparent;
    outline: none;

    &.selected {
        background-color: var(--color-accent);
        border: 2px solid transparent;
    }

    &:hover {
        border: 2px solid var(--color-shade);
    }

    &.selected:hover {
        border: 2px solid var(--color-white);
    }

    .text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
