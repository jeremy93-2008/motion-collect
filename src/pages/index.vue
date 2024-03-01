<script setup lang="ts">
import type { IMovieDB } from '~/types/MovieDB.type'
import Carrousel from '~/components/carrousel.vue'

const { data } = await useFetch<IMovieDB>(
    'https://api.themoviedb.org/3/trending/all/day?language=en-US',
    {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc3YjlmMjNmMzk2ZTZkODUzZTMyYzJhYzQwMjE4OSIsInN1YiI6IjYyYTRiZmQ2N2Y2YzhkMzYwZDdjOWVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4uuA3irBz-yTHky4z5zdvEx8WXuT7EdsgRGHtBnTRh8',
        },
    }
)
</script>

<template>
    <Carrousel :data="(data as IMovieDB).results" />
</template>
