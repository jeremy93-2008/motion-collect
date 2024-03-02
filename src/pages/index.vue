<script setup lang="ts">
import type { IMovieDB } from '~/types/MovieDB.type'
import Carrousel from '~/components/index/carrousel.vue'

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
    <!--
      <img
        :src="
          'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
          item.poster_path
        "
        alt="poster"
      />
  -->
</template>
