<script setup lang="ts">
import type { CollectionObjectWithIncludes } from '~/domain/collection'

const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])
const [id, name] = route.params.slug

const { data, pending } = await useFetch<CollectionObjectWithIncludes>(
    `${config.public.motionCollectUrl}api/collection/${id}`,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    }
)

const titles = useState<Record<string, string>>('titles')
titles.value = {
    ...titles.value,
    '/collection/:slug(.*)*': data.value?.title ?? '',
}
</script>
<template>
    <NuxtPage />
    <Wait :isLoading="pending">
        <Grid
            v-if="data"
            :items="[
                ...(data as CollectionObjectWithIncludes).Movies?.map((m) => ({
                    ...m,
                    media_type: 'movie',
                }))!,
                ...(data as CollectionObjectWithIncludes).TVSeries?.map(
                    (m) => ({
                        ...m,
                        media_type: 'show',
                    })
                )!,
            ]"
            :hasMoreItems="false"
        />
    </Wait>
</template>
