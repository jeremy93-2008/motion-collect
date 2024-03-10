import type { UseFetchOptions } from '#app'
import type { NitroFetchRequest } from 'nitropack'

interface PageParams {
    page: Ref<number>
    pageSize: Ref<number>
}

export default async function useInfiniteFetch<TData>(
    url: NitroFetchRequest,
    options: (
        pageParams: PageParams
    ) => UseFetchOptions<any, any, any, any, any, any>,
    initialPage: number = 1
) {
    const isPaginationChanging = ref(false)

    const page = ref(initialPage ?? 1)
    const pageSize = ref(10)

    const resolvedOptions = computed(() => options({ page, pageSize }))

    const {
        data: latestData,
        status,
        error,
        pending,
        execute,
        refresh,
    } = await useFetch(url, resolvedOptions.value)

    const data = ref<TData[]>(latestData.value ? [latestData.value] : [])

    watch(latestData, () => {
        if (!isPaginationChanging.value) {
            data.value = [latestData.value]
            return (page.value = 1)
        }
        data.value.push(latestData.value)
        isPaginationChanging.value = false
    })

    const pageParams = computed(() => ({
        page: page.value,
        pageSize: pageSize.value,
    }))

    const validateNotPendingAndSetPaginationFlag = () => {
        if (status.value === 'pending') return
        isPaginationChanging.value = true
        return true
    }

    return {
        data,
        latestData,
        status,
        pending,
        execute,
        refresh,
        pageParams,
        previousPage() {
            if (!validateNotPendingAndSetPaginationFlag()) return
            if (page.value > 1) page.value--
        },
        nextPage() {
            if (!validateNotPendingAndSetPaginationFlag()) return
            page.value++
        },
        setPage(newPage: number) {
            if (!validateNotPendingAndSetPaginationFlag()) return
            page.value = newPage
        },
    }
}
