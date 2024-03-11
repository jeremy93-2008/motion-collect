<script setup lang="ts">
const props = defineProps({
    distance: {
        type: Number,
        default: 20,
    },
})
const emit = defineEmits(['onReachEnd'])

const scrollElement = useState<HTMLElement | null>('scrollElement')

const onReachEnd = () => {
    //calculate the distance from the bottom of the scroll element
    const distanceFromBottom =
        scrollElement.value!.scrollHeight -
        scrollElement.value!.scrollTop -
        scrollElement.value!.clientHeight
    //if the distance from the bottom is less than the distance prop, emit the onReachEnd event
    if (distanceFromBottom < props.distance) {
        emit('onReachEnd')
    }
}

onMounted(() => {
    scrollElement.value?.addEventListener('scroll', onReachEnd)
})

onUnmounted(() => {
    scrollElement.value?.removeEventListener('scroll', onReachEnd)
})
</script>

<template>
    <div class="infinite-scroll">
        <slot />
    </div>
</template>

<style scoped>
.infinite-scroll {
    display: flex;
    flex-direction: column;

    & button {
        align-self: center;
        margin: 48px 0 16px 0;
        padding: 8px 16px;
        width: 150px;
        border-radius: 8px;
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 1.25rem;
        cursor: pointer;
    }
}
</style>
