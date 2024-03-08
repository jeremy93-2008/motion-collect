<script setup lang="ts">
import type { IMovieDB } from '@/types/MovieDB.type'
import SortBy from '~/components/sortBy.vue'
import Wait from '~/components/wait.vue'
import Infinitescroll from '~/components/infinitescroll.vue'

const route = useRoute()
const config = useRuntimeConfig()

const sortBy = computed(() => route.query.sort_by || 'popularity.desc')

const page = ref(1)

const { data, status } = await useFetch<IMovieDB>(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false
        &language=en-US`,
    {
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
        query: {
            sort_by: sortBy || 'popularity.desc',
            page: page || 1,
        },
    }
)

const newData = computed(() => data.value)

const results = ref<any[]>(data.value!.results)
watch(newData, () => {
    if (data.value!.page === 1) results.value = data.value!.results
    else results.value.push(...data.value!.results)
})
</script>

<template>
    <SortBy />
    <Wait :is-loading="status === 'pending'" :overlay="page > 1">
        <Infinitescroll :distance="100" @onReachEnd="page++">
            <Grid :items="results" />
        </Infinitescroll>
    </Wait>
</template>
