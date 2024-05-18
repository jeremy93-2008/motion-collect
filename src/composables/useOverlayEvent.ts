export function useOverlayEvent(path: string) {
    const route = useRoute()

    const onLeave = () => {
        navigateTo(route.path.replace(path, ''))
    }

    onMounted(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') onLeave()
        })
    })

    return { onLeave }
}
