<script setup lang="ts">
defineProps<{
    className?: string
    tooltipContent: string | undefined
}>()

const showTooltip = ref(true)
const refText = ref<HTMLElement | null>(null)

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
    <span :class="className" v-if="!showTooltip" ref="refText" class="text">
        <slot />
    </span>
    <span
        v-if="showTooltip"
        ref="refText"
        class="text"
        v-tooltip.bottom="tooltipContent"
    >
        <slot />
    </span>
</template>
<style scoped>
.text {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
