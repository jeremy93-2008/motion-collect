<script setup lang="ts">
import type { IMovieDB } from '~/types/MovieDB.type'
import Grid from '~/components/grid.vue'
import Wait from '~/components/wait.vue'

const route = useRoute()
const config = useRuntimeConfig()

const filterType = ref('all')

const query = useState('results-query', () => route.query.q as string)

const headers = useRequestHeaders(['cookie'])

const { data, status, pageParams, nextPage } = await useInfiniteFetch<IMovieDB>(
    `${config.public.motionCollectUrl}api/search`,
    ({ page }) => ({
        headers: {
            ...headers,
        },
        query: {
            q: query,
            filter: filterType,
            page,
            visibility: 'public',
        },
        key: `results-${query}`,
    })
)

watchEffect(() => {
    const titles = useState<Record<string, string>>('titles')
    const outerWidth = window ? window.outerWidth : 1280
    titles.value = {
        ...titles.value,
        '/results': query.value
            ? outerWidth <= 768
                ? `‟${query.value}”`
                : `Results for "${query.value}"`
            : 'Results',
    }
})

onMounted(() => {
    const handleResize = () => {
        const titles = useState<Record<string, string>>('titles')
        const outerWidth = window ? window.outerWidth : 1280
        titles.value = {
            ...titles.value,
            '/results': query.value
                ? outerWidth <= 768
                    ? `‟${query.value}”`
                    : `Results for "${query.value}"`
                : 'Results',
        }
    }
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
})

const onClickFilterType = (type: string) => {
    filterType.value = type
}
</script>
<template>
    <NuxtPage />
    <section class="tabs_results_filter_container">
        <div
            class="tabs_results_filter_button_hover_overlay"
            :class="'tabs_results_filter_button_hover_overlay_' + filterType"
        />
        <button
            @click="onClickFilterType('all')"
            class="tabs_results_filter_button"
            :class="filterType === 'all' ? 'active' : ''"
        >
            All
        </button>
        <button
            @click="onClickFilterType('movie')"
            class="tabs_results_filter_button"
            :class="filterType === 'movie' ? 'active' : ''"
        >
            Movies
        </button>
        <button
            @click="onClickFilterType('tv')"
            class="tabs_results_filter_button"
            :class="filterType === 'tv' ? 'active' : ''"
        >
            Shows
        </button>
        <button
            @click="onClickFilterType('collection')"
            class="tabs_results_filter_button"
            :class="filterType === 'collection' ? 'active' : ''"
        >
            Collections
        </button>
    </section>
    <section class="mt-1">
        <Wait
            :is-loading="status === 'pending'"
            :overlay="pageParams.page > 1"
            :size="48"
        >
            <Grid
                v-if="data"
                :items="data.map((d) => d.results).flat()"
                :hasMoreItems="pageParams.page < data[0].total_pages"
                @onMoreItems="nextPage"
                has-add-action
            />
        </Wait>
    </section>
</template>
<style scoped>
.tabs_results_filter_container {
    position: sticky;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    background: var(--color-background);
    border: 1px solid var(--color-background-shade);
    border-radius: 10px;

    @media (max-width: 1024px) {
        margin-right: 16px;
        align-items: center;
    }

    & .tabs_results_filter_button_hover_overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 25%;
        height: 100%;
        border-radius: 10px;
        background-color: var(--color-background-shade);
        z-index: -1;
        transition: transform 0.2s ease-in-out;

        &.tabs_results_filter_button_hover_overlay_all {
            transform: translateX(0);
            @media (max-width: 1024px) {
                width: 24%;
            }
        }

        &.tabs_results_filter_button_hover_overlay_movie {
            transform: translateX(100%);
            @media (max-width: 1024px) {
                transform: translateX(105%);
                width: 24%;
            }
        }

        &.tabs_results_filter_button_hover_overlay_tv {
            transform: translateX(200%);
            @media (max-width: 1024px) {
                transform: translateX(235%);
                width: 22%;
            }
        }

        &.tabs_results_filter_button_hover_overlay_collection {
            transform: translateX(300%);
            @media (max-width: 1024px) {
                transform: translateX(272%);
                width: 27%;
            }
        }
    }

    & .tabs_results_filter_button {
        display: flex;
        flex: 1;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        color: var(--color-shade);

        @media (max-width: 1024px) {
            padding: 8px 4px;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            align-items: center;
        }

        &.active {
            color: var(--color-white);
        }

        &:hover {
            color: var(--color-white);
        }
    }
}
</style>
