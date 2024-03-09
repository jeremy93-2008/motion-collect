import type { UseFetchOptions } from '#app'
import type { NitroFetchRequest } from 'nitropack'

export default async function useInfiniteFetch<TData, TResult>(
    url: NitroFetchRequest,
    options: UseFetchOptions<any, any, any, any, any, any>,
    extractDataValues: (data: TData) => any[],
    currentPageRef: globalThis.Ref<number>,
    resetPageRef: globalThis.ComputedRef<any>[] | globalThis.Ref<any>
) {
    const fetcher = await useFetch(url, options)

    const { data: latestData } = fetcher

    const results = ref<TResult[]>(
        latestData?.value ? extractDataValues(latestData.value!) : []
    )

    watch(latestData, () => {
        if (currentPageRef.value === 1)
            results.value = extractDataValues(latestData.value!)
        else results.value.push(...extractDataValues(latestData.value!))
    })

    watch(resetPageRef, () => {
        currentPageRef.value = 1
    })

    return { results, fetcher }
}
