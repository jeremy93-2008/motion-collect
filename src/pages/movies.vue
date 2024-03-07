<script setup lang="ts">
import type { IMovieDB } from '@/types/MovieDB.type'
import SortBy from '~/components/sortBy.vue'
import Wait from '~/components/wait.vue'

const route = useRoute()
const config = useRuntimeConfig()

const sortBy = computed(() => route.query.sort_by || 'popularity.desc')

const { data, status } = await useFetch<IMovieDB>(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false
        &language=en-US`,
    {
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
        query: {
            sort_by: sortBy || 'popularity.desc',
            page: 1,
        },
    }
)
</script>

<template>
    <SortBy />
    <Wait :is-loading="status === 'pending'">
        <Grid :items="(data as IMovieDB).results" />
    </Wait>
</template>
