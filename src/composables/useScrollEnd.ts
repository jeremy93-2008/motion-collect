export function useScrollEnd(distance: number, cb: () => void) {
    const scrollElement = useState<HTMLElement | null>('scrollElement')

    const onMoreItems = () => {
        //calculate the distance from the bottom of the scroll element
        const distanceFromBottom =
            scrollElement.value!.scrollHeight -
            scrollElement.value!.scrollTop -
            scrollElement.value!.clientHeight
        //if the distance from the bottom is less than the distance prop, emit the onReachEnd event
        if (distanceFromBottom < distance) {
            cb()
        }
    }

    onMounted(() => {
        scrollElement.value?.addEventListener('scroll', onMoreItems)
    })

    onUnmounted(() => {
        scrollElement.value?.removeEventListener('scroll', onMoreItems)
    })
}
