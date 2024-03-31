export function useOverlayEvent() {
    const route = useRoute()

    const onLeave = () => {
        navigateTo(route.path.replace('/search', ''))
    }

    onMounted(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') onLeave()
        })
    })

    return { onLeave }
}
