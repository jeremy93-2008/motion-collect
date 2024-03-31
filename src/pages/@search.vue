<script setup lang="ts">
import Input from '~/components/search/input.vue'
import { useOverlayEvent } from '~/composables/useOverlayEvent'
import { type Movie } from '~/types/MovieDB.type'

import MovieSvg from '~/assets/movies.svg'
import TvSvg from '~/assets/tv.svg'
import CollectionSvg from '~/assets/collections.svg'
import useConditionalFetch from '~/composables/useConditionalFetch'

const route = useRoute()
const config = useRuntimeConfig()

const query = computed(() => route.query.q)

const headers = useRequestHeaders(['cookie'])
const fetchedData = await useConditionalFetch<Movie[]>(
    `${config.public.motionCollectUrl}api/search`,
    {
        headers: {
            ...headers,
        },
        query: {
            q: query,
        },
    },
    computed(() => query.value as string)
)

const onSearchChange = async (val: string) => {
    if (!val) {
        const { q, ...rest } = route.query
        return navigateTo({
            query: {
                ...rest,
            },
        })
    }
    navigateTo({
        query: {
            ...route.query,
            q: val,
        },
    })
}

const { onLeave } = useOverlayEvent()
</script>

<template>
    <section @click="onLeave" class="search_overlay" />
    <section class="search_container">
        <Input :value="route.query.q ?? ''" @on-change="onSearchChange" />
        <Wait
            :is-loading="
                fetchedData?.status.value === 'pending' && query !== ''
            "
        >
            <ul
                class="search_list"
                v-if="fetchedData?.status.value !== 'pending'"
            >
                <li
                    class="search_entry"
                    v-for="movie in fetchedData?.data.value ?? []"
                    :key="movie.id"
                >
                    <div class="search_entry-type">
                        <img
                            v-if="movie.media_type === 'movie'"
                            class="search_entry-type_img"
                            :src="MovieSvg"
                            alt="movie entry"
                            title="Movie"
                        />
                        <img
                            v-else-if="movie.media_type === 'tv'"
                            class="search_entry-type_img"
                            :src="TvSvg"
                            alt="tv entry"
                            title="TV Show"
                        />
                        <img
                            v-else-if="movie.media_type === 'collection'"
                            class="search_entry-type_img"
                            :src="CollectionSvg"
                            alt="collection entry"
                            title="Collection"
                        />
                    </div>

                    <img
                        :src="
                            movie.poster_path
                                ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                                  movie.poster_path
                                : 'https://fakeimg.pl/270x390?text=image'
                        "
                        class="search_entry-poster"
                    />
                    <span class="search_entry-title">{{
                        movie.title ?? movie.name
                    }}</span>
                </li>
            </ul>
        </Wait>
    </section>
</template>

<style scoped>
.search_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.15s linear both;
}
.search_container {
    position: fixed;
    top: 12vh;
    left: calc(50vw - 250px);
    box-sizing: content-box;
    width: 500px;
    min-height: 50px;
    max-height: 550px;
    min-width: 400px;
    background-color: var(--color-background);
    border-radius: 20px;
    z-index: 100;
    padding: 0 30px 30px 30px;
    overflow-y: auto;
    animation: slideToTop 0.2s linear both;

    .search_list {
        display: flex;
        flex-direction: column;
        zoom: 0.8;

        & .search_entry {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;

            &:hover {
                background-color: var(--color-background-shade);
            }

            & .search_entry-poster {
                width: 50px;
                height: 75px;
                object-fit: cover;
                border-radius: 10px;
                margin-right: 10px;
            }

            & .search_entry-type {
                font-size: 12px;
                color: var(--color-accent);
                margin-right: 10px;
            }

            & .search_entry-title {
                font-size: 16px;
                color: var(--color-text);
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes slideToTop {
    0% {
        transform: translateY(-10%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
