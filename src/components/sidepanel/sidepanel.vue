<script setup lang="ts">
import { useAuth } from 'vue-clerk'
import { useAlert } from '~/composables/useAlert'
import type { MediaObject } from '~/domain/media'

import homeIcon from 'assets/home.svg'
import moviesIcon from 'assets/movies.svg'
import tvIcon from 'assets/tv.svg'
import collectionIcon from 'assets/collection.svg'
import searchIcon from 'assets/search.svg'

import plusIcon from 'assets/plus.svg'

import Sidebutton from './sidebutton.vue'
import Sidemediabutton from './sidemediabutton.vue'
import Iconbutton from '../iconbutton.vue'
import type { CollectionObjectWithIncludes } from '~/domain/collection'

const { isSignedIn, isLoaded, userId } = useAuth()

const route = useRoute()
const config = useRuntimeConfig()

const path = computed(() => route.path)

const { data: cachedCollectionData } =
    useNuxtData<CollectionObjectWithIncludes[]>('collections')
const { data, pending } = await useLazyFetch<MediaObject[]>(
    `${config.public.motionCollectUrl}api/collections`,
    {
        headers: {
            'Content-Type': 'application/json',
        },
        watch: [path, isLoaded, isSignedIn, userId],
        key: 'collections',
        default() {
            return cachedCollectionData.value
        },
    }
)

watch(path, () => {
    isOpen.value = false
})

const isOpen = useState('MenuIsOpen')

const { showErrorAlert } = useAlert()
</script>

<template>
    <section
        @click="isOpen = false"
        class="overlay-responsive"
        :class="isOpen ? 'open' : ''"
    ></section>
    <aside class="sidepanel" :class="isOpen ? 'open' : ''">
        <NuxtLink class="logo" href="/">
            <img
                class="h-[48px]"
                src="../../assets/logo.svg"
                alt="Motion Collect"
            />
            <span>Motion Collect</span>
        </NuxtLink>
        <section class="list">
            <Sidebutton
                v-if="route.matched[0].name === 'results'"
                @click="isOpen = false"
                :leftIcon="searchIcon"
                :selected="route.matched[0].name === 'results'"
                small
            >
                <span>Results</span>
            </Sidebutton>
            <Sidebutton
                @click="() => navigateTo('/')"
                :leftIcon="homeIcon"
                :selected="route.matched[0].name === 'index'"
                >Home
            </Sidebutton>
            <Sidebutton
                @click="() => navigateTo('/movies')"
                :leftIcon="moviesIcon"
                :selected="(route.matched[0].name as string).includes('movie')"
                >Movies
            </Sidebutton>
            <Sidebutton
                @click="() => navigateTo('/shows')"
                :leftIcon="tvIcon"
                :selected="(route.matched[0].name as string).includes('show')"
                >TV Shows
            </Sidebutton>

            <div class="collection">
                <div class="title">
                    <img src="../../assets/collections.svg" alt="Collections" />
                    <span>Collections</span>
                    <Iconbutton
                        @click="
                            () =>
                                isSignedIn
                                    ? navigateTo(
                                          route.path === '/'
                                              ? '/collection/add'
                                              : `${route.path}/collection/add`
                                      )
                                    : showErrorAlert(
                                          'Error',
                                          'You need to be logged in to create a collection'
                                      )
                        "
                        :disabled="!isSignedIn"
                        :title="
                            isSignedIn
                                ? 'Create Collection'
                                : 'You need to be logged in to create a collection'
                        "
                        class-name="mr-3"
                        size="18px"
                        :icon="plusIcon"
                    />
                </div>
            </div>
            <div class="collection_list">
                <Sidemediabutton
                    @click="() => navigateTo('/collections')"
                    :leftIcon="collectionIcon"
                    :selected="
                        (route.matched[0].name as string).includes(
                            'collections'
                        )
                    "
                    >Public Collections
                </Sidemediabutton>
                <div
                    class="separator my-1 h-[1px] bg-[var(--color-background-shade)] rounded-full"
                />
                <Wait
                    :is-loading="
                        (!isLoaded || pending) && !cachedCollectionData
                    "
                >
                    <Sidemediabutton
                        v-for="collection in data"
                        @click="
                            () =>
                                navigateTo(
                                    `/collection/${collection.id}/${collection.title}`
                                )
                        "
                        :leftIcon="collectionIcon"
                        :selected="
                            (route.params.slug &&
                                route.params.slug.length >= 2 &&
                                (route.params.slug as string[])[1] ===
                                    collection.title) ||
                            false
                        "
                        :tooltipContent="collection.title"
                        >{{ collection.title }}</Sidemediabutton
                    >
                </Wait>
            </div>
        </section>
    </aside>
</template>

<style scoped>
.overlay-responsive {
    display: none;

    @media (max-width: 1024px) {
        &.open {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 99;
        }
    }
}
.sidepanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 110vh;
    flex: 0 0 300px;
    padding: 24px 10px 0 10px;
    overflow-y: auto;
    scrollbar-width: thin;

    @media (max-width: 1024px) {
        position: absolute;
        background-color: var(--color-background);
        z-index: 100;
        height: 100vh;
        left: -300px;
        transition: left 0.3s ease-in-out;
        &.open {
            left: 0;
        }
    }

    & .logo {
        display: flex;
        align-items: center;
        margin-bottom: 36px;
        & img {
            margin-right: 8px;
        }
        & span {
            font-size: 18px;
        }
    }

    & .list {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 12px;

        & .collection {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            margin: 24px 0 12px 0;

            & .title {
                display: flex;
                align-items: center;
                gap: 24px;
                & img {
                    width: 24px;
                    height: 24px;
                }
                & span {
                    font-size: 16px;
                }
            }
        }

        & .collection_list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            height: calc(100vh - 428px);
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--color-accent) var(--color-background-shade);

            @media (max-width: 1024px) {
                height: auto;
                overflow: visible;
                margin-bottom: 22px;
            }
        }
    }
}
</style>
