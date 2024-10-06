<script setup lang="ts">
import type { IMovieDB, Movie } from '@/types/MovieDB.type'
import SortBy from '~/components/sortBy.vue'
import Wait from '~/components/wait.vue'

const route = useRoute()
const config = useRuntimeConfig()

const headers = useRequestHeaders(['cookie'])
const { data, status } = await useFetch<IMovieDB>(
    `${config.public.motionCollectUrl}api/collections`,
    {
        headers: {
            ...headers,
        },
        query: {
            visibility: 'public',
            notIncludedUser: false,
        },
    }
)
</script>

<template>
    <NuxtPage />
    <SortBy />
    <Wait :is-loading="status === 'pending'">
        <Grid :items="data" media-type="collection" />
    </Wait>
</template>
