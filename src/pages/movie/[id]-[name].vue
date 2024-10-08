<script setup lang="ts">
import type { FullMovie, MovieJustWatch } from '~/types/MovieDB.type'
import { toCapitalize } from '~/utils/toCapitalize'
import type { CollectionObjectWithIncludes } from '~/domain/collection'
import Mediaactions from '~/components/mediaactions.vue'

const route = useRoute()
const config = useRuntimeConfig()

const { data, status } = await useFetch<FullMovie>(
    `https://api.themoviedb.org/3/movie/${route.params.id}?include_adult=false&include_video=false&language=en-US`,
    {
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
    }
)

const { data: dataWatchProvider } = await useFetch<MovieJustWatch>(
    `https://api.themoviedb.org/3/movie/${route.params.id}/watch/providers?include_adult=false&include_video=false&language=en-US`,
    {
        headers: {
            Authorization: 'Bearer ' + config.public.moviedbApiKey,
        },
    }
)

const refWatchProviderCountry = ref('')
watch(
    dataWatchProvider,
    (newVal) => {
        if (!newVal || !newVal.results) return
        const isESExist = Object.keys(newVal.results).includes('ES')
        refWatchProviderCountry.value = isESExist
            ? 'ES'
            : Object.keys(newVal.results)[0]
    },
    { immediate: true }
)

const motion_page_title = useState('motion_page_title')
motion_page_title.value = 'Movie'

const headers = useRequestHeaders(['cookie'])

const { data: cachedCollectionData } =
    useNuxtData<CollectionObjectWithIncludes[]>('collections')
const { data: collections } = await useLazyFetch<
    CollectionObjectWithIncludes[]
>(`${config.public.motionCollectUrl}api/collections`, {
    headers: {
        ...headers,
        'Content-Type': 'application/json',
    },
    key: 'collections',
    default() {
        return cachedCollectionData.value
    },
})
</script>

<template>
    <NuxtPage />
    <section class="movie_details">
        <section class="poster_container">
            <section class="poster_actions">
                <Mediaactions
                    :collections="collections as CollectionObjectWithIncludes[]"
                    :mediaItem="{ ...data, media_type: 'movie' } as FullMovie"
                />
            </section>
            <img
                class="poster"
                :src="
                    data.poster_path
                        ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                          data.poster_path
                        : 'https://fakeimg.pl/270x390?text=image'
                "
                alt="poster"
            />
        </section>
        <section class="summary">
            <section class="title">
                <div class="title-header flex gap-2">
                    {{ data.title }}
                    <div class="website_link" :title="data.title + ' Webpage'">
                        <NuxtLink :to="data.homepage" external target="_blank">
                            <Icon name="material-symbols:link" />
                        </NuxtLink>
                    </div>
                    <div
                        class="imdb_link"
                        :title="data.title + ' IMDB Webpage'"
                    >
                        <NuxtLink
                            :to="'https://www.imdb.com/title/' + data.imdb_id"
                            external
                            target="_blank"
                        >
                            <Icon name="bxl:imdb" />
                        </NuxtLink>
                    </div>
                    <section class="production_countries flex gap-2 ml-1">
                        <div
                            v-for="country in data.production_countries"
                            class="countries"
                        >
                            <img
                                class="rounded"
                                :src="
                                    country.iso_3166_1
                                        ? `https://flagsapi.com/${country.iso_3166_1}/flat/32.png`
                                        : 'https://fakeimg.pl/120x60?text=image'
                                "
                            />
                        </div>
                    </section>
                </div>
                <div class="flex">
                    <div class="release-date text-sm">
                        {{
                            data.release_date
                                ? new Intl.DateTimeFormat('en-US', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                  }).format(new Date(data.release_date))
                                : 'No release date'
                        }}
                    </div>
                </div>
            </section>
            <p class="text-sm italic">{{ data.tagline }}</p>
            <div class="genres_container">
                <div v-for="genre in data.genres" class="genre">
                    {{ genre.name }}
                </div>
            </div>
            <p class="description">{{ data.overview }}</p>
            <section class="grid-info grid grid-cols-2 items-center my-3">
                <div class="flex items-center gap-4 mt-3 mb-4">
                    Rating
                    <div
                        class="progress-bar"
                        :title="data.vote_average + '/10'"
                        :style="`
                        min-width: 32px;
                        background: radial-gradient(
                                closest-side,
                                #2b2d42 79%,
                                transparent 80% 100%
                            ),
                            conic-gradient(#d80032 ${data.vote_average * 10}%, #c2919c 0);
                    `"
                    ></div>
                    {{ data.vote_average + '/10' }}
                </div>
                <div class="flex gap-4 mt-3 mb-4">
                    Runtime
                    <div>{{ data.runtime }} minutes</div>
                </div>
                <div class="flex gap-4 mt-3 mb-4">
                    Budget
                    <div>
                        ${{
                            new Intl.NumberFormat('en-US', {
                                useGrouping: true,
                            }).format(data.budget)
                        }}
                    </div>
                </div>
                <span class="flex gap-4 h-[32px] mt-3 mb-4"
                    >Revenue
                    <div>
                        ${{
                            new Intl.NumberFormat('en-US', {
                                useGrouping: true,
                            }).format(data.revenue)
                        }}
                    </div></span
                >
            </section>
            <span class="block text-lg mt-4 mb-1">Production Companies</span>
            <section class="company_container flex gap-2 items-center">
                <div
                    v-for="company in data.production_companies"
                    class="company"
                >
                    <img
                        class="bg-white p-3 rounded w-[150px]"
                        :src="
                            company.logo_path
                                ? 'https://image.tmdb.org/t/p/original' +
                                  company.logo_path
                                : `https://fakeimg.pl/120x60?text=${company.name}`
                        "
                    />
                </div>
            </section>
            <span
                v-if="Object.keys(dataWatchProvider.results).length > 0"
                class="block text-lg mt-12 mb-4"
                >Streaming Providers
                <sub class="text-xs">powered by JustWatch</sub></span
            >
            <section
                v-if="Object.keys(dataWatchProvider.results).length > 0"
                class="streaming_container flex flex-col gap-6"
            >
                <select
                    v-model="refWatchProviderCountry"
                    class="border border-gray-300 rounded p-2 bg-[#2B2D42] text-white w-fit"
                >
                    <option
                        v-for="key in Object.keys(dataWatchProvider.results)"
                        :value="key"
                        :key="key"
                    >
                        {{ key }}
                    </option>
                </select>
                <section
                    v-for="key in Object.keys(
                        dataWatchProvider.results[refWatchProviderCountry]
                    )
                        .slice(1)
                        .sort((a, b) => a.localeCompare(b))"
                    class="streaming_entry flex flex-col gap-2"
                >
                    <span class="block text -sm mb-1">{{
                        toCapitalize(key)
                    }}</span>
                    <div class="flex gap-2">
                        <div
                            v-for="stream in dataWatchProvider.results[
                                refWatchProviderCountry
                            ][key]"
                            class="streaming"
                        >
                            <NuxtLink
                                external
                                :to="`https://www.themoviedb.org/movie/${data.id}-${data.title.replaceAll(' ', '-')}/watch`"
                                target="_blank"
                                :title="stream.provider_name"
                            >
                                <img
                                    class="rounded w-[32px]"
                                    :src="
                                        stream.logo_path
                                            ? 'https://image.tmdb.org/t/p/original' +
                                              stream.logo_path
                                            : `https://fakeimg.pl/120x60?text=${stream.name}`
                                    "
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    </section>
</template>

<style scoped>
.movie_details {
    display: flex;
    gap: 16px;
    .poster_container {
        position: relative;
        @media (max-width: 1024px) {
            flex: 1;
        }
        .poster_actions {
            position: absolute;
            right: -12px;
            top: 0;
        }
    }
    .poster {
        border-radius: 10px;
    }
    .summary {
        flex: 1;

        @media (max-width: 1024px) {
            flex: 2;
        }

        a:hover {
            transition: color 0.2s ease-in-out;
            color: var(--color-accent);
        }
        .title {
            display: flex;
            gap: 8px;
            justify-content: space-between;
            align-items: center;
            margin-right: 16px;
            font-size: 22px;

            .website_link {
                cursor: pointer;
            }

            .production_countries,
            .release-date {
                @media (max-width: 1024px) {
                    display: none;
                }
            }
        }
        .genres_container {
            display: flex;
            gap: 8px;
            margin-top: 8px;

            @media (max-width: 1024px) {
                flex-wrap: wrap;
            }

            .genre {
                padding: 4px 8px;
                background: var(--color-accent);
                border-radius: 10px;
                user-select: none;
            }
        }
        .company_container {
            display: flex;
            @media (max-width: 1024px) {
                flex-wrap: wrap;
            }
        }
        .streaming_container {
            display: flex;
            @media (max-width: 1024px) {
                flex-wrap: wrap;
            }
        }
        .description {
            margin: 16px 132px 2px 0;

            @media (max-width: 1024px) {
                margin: 16px 8px 2px 2px;
            }
        }
        .grid-info {
            @media (max-width: 1024px) {
                grid-template-columns: 1fr;
            }
        }
    }
    .progress-bar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
}
</style>
