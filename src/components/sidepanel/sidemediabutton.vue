<script setup lang="ts">
defineProps({
    leftIcon: String,
    selected: Boolean,
    tooltipContent: String,
})
defineEmits(['click'])
const showTooltip = ref(true)
const refText = ref(null)

onMounted(() => {
    window.setTimeout(() => {
        if (refText.value) {
            const text = refText.value as HTMLElement
            if (text.offsetWidth >= text.scrollWidth) {
                showTooltip.value = false
            }
        }
    }, 1000)
})
</script>

<template>
    <button @click="$emit('click')" class="button" :class="{ selected }">
        <img class="h-[16px] w-[16px] mr-4" :src="leftIcon" alt="icon" />
        <span v-if="!showTooltip" ref="refText" class="text"><slot /></span>
        <span
            v-if="showTooltip"
            ref="refText"
            class="text"
            v-tooltip.bottom="tooltipContent"
            ><slot
        /></span>
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
