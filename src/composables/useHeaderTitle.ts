export function useHeaderTitle() {
    const requestURL = useRequestURL()
    const route = useRoute()

    const titles = useState('titles', () => ({
        '/': '',
        '/movies': 'Movies',
        '/shows': 'TV Shows',
        '/show/:id()-:name()': 'TV Show',
        '/movie/:id()-:name()': 'Movie',
        '/collection/:slug(.*)*': '',
        '/results': 'Search Results',
    }))

    const pathname = ref(requestURL.pathname)

    watchEffect(() => {
        pathname.value = route.matched[0].path
    })

    return computed(() => {
        return titles.value[pathname.value as '/'] ?? '404 Not Found'
    })
}
