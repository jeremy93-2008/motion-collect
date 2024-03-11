<script setup lang="ts">
import type { IMovieDB } from '~/types/MovieDB.type'
import Carrousel from '~/components/index/carrousel.vue'
import Grid from '~/components/grid.vue'
import Wait from '~/components/wait.vue'

const config = useRuntimeConfig()
const { data, status, pageParams, nextPage } = await useInfiniteFetch<IMovieDB>(
    'https://api.themoviedb.org/3/trending/all/week?language=en-US',
    ({ page }) => ({
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
        query: {
            page: page || 1,
        },
    })
)
</script>

<template>
    <Carrousel :data="data[0].results.slice(0, 5)" />
    <h3 class="small-title">Trending</h3>
    <Wait :is-loading="status === 'pending'" :overlay="pageParams.page > 1">
        <Grid
            :items="data.map((d) => d.results).flat()"
            :hasMoreItems="pageParams.page < data[0].total_pages"
            @onMoreItems="nextPage"
        />
    </Wait>
</template>

<style scoped>
h3.small-title {
    font-size: 24px;
    margin: 24px 0 8px 16px;
}
</style>
