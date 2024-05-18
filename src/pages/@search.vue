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

const filterType = ref('all')

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
            filter: filterType,
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

const onClickFilterType = (type: string) => {
    filterType.value = type
}

const { onLeave } = useOverlayEvent('/search')

const getFilterTypePath = (media_type: string) => {
    if (media_type === 'all') return 'all'
    if (media_type === 'movie') return 'movie'
    if (media_type === 'tv') return 'serie'
    if (media_type === 'collection') return 'collection'
}

const getMediaUrl = (movie: Movie) => {
    const type = getFilterTypePath(movie.media_type ?? filterType.value)
    return `/${type}/${movie.id}-${movie.title ?? movie.name}`
}
</script>

<template>
    <section @click="onLeave" class="subpage_overlay" />
    <section class="search_container">
        <Input :value="route.query.q ?? ''" @on-change="onSearchChange" />
        <section v-if="route.query.q" class="tabs_search_filter_container">
            <div
                class="tabs_search_filter_button_hover_overlay"
                :class="'tabs_search_filter_button_hover_overlay_' + filterType"
            />
            <button
                @click="onClickFilterType('all')"
                class="tabs_search_filter_button"
                :class="filterType === 'all' ? 'active' : ''"
            >
                All
            </button>
            <button
                @click="onClickFilterType('movie')"
                class="tabs_search_filter_button"
                :class="filterType === 'movie' ? 'active' : ''"
            >
                Movies
            </button>
            <button
                @click="onClickFilterType('tv')"
                class="tabs_search_filter_button"
                :class="filterType === 'tv' ? 'active' : ''"
            >
                TV Shows
            </button>
            <button
                @click="onClickFilterType('collection')"
                class="tabs_search_filter_button"
                :class="filterType === 'collection' ? 'active' : ''"
            >
                Collections
            </button>
        </section>
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
                    <NuxtLink :to="getMediaUrl(movie)">
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
                    </NuxtLink>
                </li>
            </ul>
        </Wait>
    </section>
</template>

<style scoped>
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

    .tabs_search_filter_container {
        position: sticky;
        top: 73px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;
        background: var(--color-background);
        border: 1px solid var(--color-background-shade);
        border-radius: 10px;

        & .tabs_search_filter_button_hover_overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 25%;
            height: 100%;
            border-radius: 10px;
            background-color: var(--color-background-shade);
            z-index: -1;
            transition: transform 0.2s ease-in-out;

            &.tabs_search_filter_button_hover_overlay_all {
                transform: translateX(0);
            }

            &.tabs_search_filter_button_hover_overlay_movie {
                transform: translateX(100%);
            }

            &.tabs_search_filter_button_hover_overlay_tv {
                transform: translateX(200%);
            }

            &.tabs_search_filter_button_hover_overlay_collection {
                transform: translateX(300%);
            }
        }

        & .tabs_search_filter_button {
            display: flex;
            flex: 1;
            justify-content: center;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            color: var(--color-shade);

            &.active {
                color: var(--color-white);
            }

            &:hover {
                color: var(--color-white);
            }
        }
    }

    .search_list {
        display: flex;
        flex-direction: column;

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

            & a {
                display: flex;
                align-items: center;
                flex: 1;
            }

            & .search_entry-poster {
                width: 45px;
                height: 65px;
                object-fit: cover;
                border-radius: 10px;
                margin-right: 10px;
            }

            & .search_entry-type_img {
                width: 16px;
                height: 16px;
                margin-right: 5px;
            }

            & .search_entry-type {
                font-size: 12px;
                color: var(--color-accent);
                margin-right: 10px;
            }

            & .search_entry-title {
                font-size: 14px;
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
</style>
