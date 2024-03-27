import { useAuth } from 'vue-clerk'

export function useSSRAuth() {
    const { getToken, ...auth } = useAuth()
    const token = ref(useCookie('__session').value)

    watch(
        () => getToken.value(),
        async (value) => {
            token.value = await value
        }
    )

    return { ...auth, token }
}
