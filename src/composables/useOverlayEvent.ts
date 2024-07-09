export function useOverlayEvent(path: string) {
    const route = useRoute()

    const resultsQuery = useState('results-query')

    const onLeave = () => {
        if (route.name === 'results-search')
            return navigateTo(
                `${route.path.replace(path, '')}?q=${resultsQuery.value}`
            )
        navigateTo(`${route.path.replace(path, '')}`)
    }

    onMounted(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') onLeave()
        })
    })

    return { onLeave }
}
