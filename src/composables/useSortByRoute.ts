export function useSortByRoute(options: { text: string; value: string }[]) {
    const router = useRouter()
    const route = useRoute()

    const selectedOption = ref('popularity')
    const selectedDirection = ref('desc')

    const selectedSortBy = computed(() => {
        return `${selectedOption.value}.${selectedDirection.value}`
    })

    onMounted(() => {
        if (!route.query.sort_by)
            return navigateTo({ query: { sort_by: selectedSortBy.value } })
        const [sortBy, direction] = (route.query.sort_by as string).split('.')

        if (!options.some((option) => option.value === sortBy))
            return router.replace({ query: { sort_by: selectedSortBy.value } })

        selectedOption.value = sortBy
        selectedDirection.value = direction
    })

    watch(selectedSortBy, () => {
        navigateTo({ query: { sort_by: selectedSortBy.value } })
    })

    return {
        selectedOption,
        selectedDirection,
        selectedSortBy,
    }
}
