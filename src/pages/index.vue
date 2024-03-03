<script setup lang="ts">
import type { IMovieDB } from '~/types/MovieDB.type'
import Carrousel from '~/components/index/carrousel.vue'
import Grid from '~/components/grid.vue'

const config = useRuntimeConfig()
const { data } = await useFetch<IMovieDB>(
    'https://api.themoviedb.org/3/trending/all/week?language=en-US',
    {
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
    }
)
</script>

<template>
    <Carrousel :data="(data as IMovieDB).results.slice(0, 4)" :length="4" />
    <h3 class="small-title">Trending</h3>
    <Grid :items="(data as IMovieDB).results" />
</template>

<style scoped>
h3.small-title {
    font-size: 24px;
    margin: 24px 0 8px 16px;
}
</style>
