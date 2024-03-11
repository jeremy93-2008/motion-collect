<script setup lang="ts">
import type { IMovieDB, Movie } from '@/types/MovieDB.type'
import SortBy from '~/components/sortBy.vue'
import Wait from '~/components/wait.vue'
import Infinitescroll from '~/components/infinitescroll.vue'
import useInfiniteFetch from '~/composables/useInfiniteFetch'
import Skeletongrid from '~/components/skeletongrid.vue'

const route = useRoute()
const config = useRuntimeConfig()

const sortBy = computed(() => route.query.sort_by || 'popularity.desc')

const { data, status, pageParams, nextPage } = await useInfiniteFetch<IMovieDB>(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false
        &language=en-US`,
    ({ page }) => ({
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
        query: {
            sort_by: sortBy || 'popularity.desc',
            page: page || 1,
        },
    })
)
</script>

<template>
    <SortBy />
    <Wait :is-loading="status === 'pending'" :overlay="pageParams.page > 1">
        <Infinitescroll :distance="100" @onReachEnd="nextPage">
            <Grid :items="data.map((d) => d.results).flat()" />
            <Skeletongrid />
        </Infinitescroll>
    </Wait>
</template>
