<script setup lang="ts">
import type { IMovieDB, Movie } from '@/types/MovieDB.type'
import SortBy from '~/components/sortBy.vue'
import Wait from '~/components/wait.vue'
import useInfiniteFetch from '~/composables/useInfiniteFetch'

const route = useRoute()
const config = useRuntimeConfig()

const sortBy = computed(() => route.query.sort_by || 'popularity.desc')

const { data, status, pageParams, nextPage } = await useInfiniteFetch<IMovieDB>(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false
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

const motion_page_title = useState('motion_page_title')
motion_page_title.value = 'TV Shows'
</script>

<template>
    <NuxtPage />
    <SortBy />
    <Wait :is-loading="status === 'pending'" :overlay="pageParams.page > 1">
        <Grid
            :items="data.map((d) => d.results).flat()"
            :hasMoreItems="pageParams.page < data[0].total_pages"
            @onMoreItems="nextPage"
            media-type="show"
            has-add-action
        />
    </Wait>
</template>
