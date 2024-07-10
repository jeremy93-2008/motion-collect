export function useHeaderLink() {
    const requestURL = useRequestURL()
    const route = useRoute()

    const href = useState('href', () => ({
        '/': undefined,
        '/movies': undefined,
        '/shows': undefined,
        '/show/:id()-:name()': '/shows',
        '/movie/:id()-:name()': '/movies',
        '/collection/:slug(.*)*': undefined,
        '/results': undefined,
    }))

    const pathname = ref(requestURL.pathname)

    watchEffect(() => {
        pathname.value = route.matched[0].path
    })

    return computed(() => {
        return href.value[pathname.value as '/']
    })
}
