export function useOverlayEvent() {
    const route = useRoute()

    const onLeave = () => {
        navigateTo(route.matched[0].path)
    }

    onMounted(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') onLeave()
        })
    })

    return { onLeave }
}
