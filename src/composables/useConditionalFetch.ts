import type { NitroFetchRequest } from 'nitropack'
import type { UseFetchOptions } from '#app'
import type { ComputedRef } from 'vue'

export default async function useConditionalFetch<T>(
    url: NitroFetchRequest,
    options: UseFetchOptions<any, any, any, any, any, any>,
    condition: ComputedRef<string>
) {
    return useFetch<T>(url, {
        ...options,
        onRequest(context) {
            const controller = new AbortController()
            context.options.signal = controller.signal
            if (!condition.value) {
                controller.abort()
            }
        },
    })
}
