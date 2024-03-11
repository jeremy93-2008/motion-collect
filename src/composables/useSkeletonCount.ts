export function useSkeletonCount() {
    const skeletonCountRef = ref(0)

    onMounted(() => {
        skeletonCountRef.value = Math.trunc(window.innerWidth / 300)
    })

    return {
        skeletonCount: skeletonCountRef,
    }
}
