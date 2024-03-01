<script lang="ts" setup>
import type { IMovieDB } from '~/types/MovieDB.type'

defineProps({
    data: Array,
})
</script>

<template>
    <section class="carrousel_container">
        <ul class="carrousel">
            <li v-for="item in data" :key="item.id">
                <img
                    :src="
                        'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces' +
                        item.backdrop_path
                    "
                    alt="backdrop"
                />
                <!--<img
              :src="
                  'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                  item.poster_path
              "
              alt="poster"
          />-->
            </li>
        </ul>
    </section>
</template>

<style scoped>
ul.carrousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding: 1rem;
    list-style: none;
    margin: 0;
}
</style>
