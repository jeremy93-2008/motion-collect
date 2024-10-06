<script setup lang="ts">
const props = defineProps<{
    idx?: number
    className?: string
    clamp?: number
    tooltipContent: string | undefined
}>()

const showTooltip = ref(true)
const refText = ref<HTMLElement | null>(null)

const checkTextOverflow = () => {
    if (refText.value && !props.clamp) {
        const text = refText.value as HTMLElement
        if (text.offsetWidth >= text.scrollWidth) {
            showTooltip.value = false
        }
    } else if (refText.value && props.clamp) {
        const text = refText.value as HTMLElement
        showTooltip.value = text.offsetHeight < text.scrollHeight
    }
}

onMounted(() => {
    window.setTimeout(() => {
        checkTextOverflow()
    }, 1000)
})

watch(
    () => props.idx,
    () => {
        window.setTimeout(() => {
            checkTextOverflow()
        }, 1000)
    }
)
</script>
<template>
    <span
        :class="
            clamp
                ? `text-clamp ${className ? className : ''}`
                : `text ${className ? className : ''}`
        "
        v-if="!showTooltip"
        ref="refText"
        :style="`-webkit-box-orient: vertical; -webkit-line-clamp: ${clamp}`"
    >
        <slot />
    </span>
    <span
        v-if="showTooltip"
        ref="refText"
        :class="clamp ? 'text-clamp ' : 'text'"
        :style="`-webkit-box-orient: vertical; -webkit-line-clamp: ${clamp}`"
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
.text-clamp {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
}
</style>
