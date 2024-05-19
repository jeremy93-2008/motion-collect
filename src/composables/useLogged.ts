export function useLogged() {
    const headers = useRequestHeaders(['cookie'])

    const isLogged = computed(() => {
        return (
            headers.cookie?.includes('__session=') &&
            headers.cookie?.includes('__clerk_db_jwt=')
        )
    })

    return { isLogged }
}
