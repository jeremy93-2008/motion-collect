<script setup lang="ts">
import type { IMovieDB } from '@/types/MovieDB.type'
import SortBy from '~/components/sortBy.vue'

const selectedValue = useState('selectedValue', () => 'popularity.desc')

const config = useRuntimeConfig()
const { data } = await useFetch<IMovieDB>(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false
        &language=en-US`,
    {
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
        watch: [selectedValue],
        query: {
            sort_by: selectedValue,
            page: 1,
        },
    }
)
</script>

<template>
    <SortBy />
    <Grid :items="(data as IMovieDB).results" />
</template>
