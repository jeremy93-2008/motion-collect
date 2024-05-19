<script setup lang="ts">
import type { MediaObject } from '~/domain/media'

import homeIcon from 'assets/home.svg'
import moviesIcon from 'assets/movies.svg'
import tvIcon from 'assets/tv.svg'
import collectionIcon from 'assets/collection.svg'

import plusIcon from 'assets/plus.svg'

import Sidebutton from './sidebutton.vue'
import Sidemediabutton from './sidemediabutton.vue'
import Iconbutton from '../iconbutton.vue'

const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

const path = computed(() => route.path)

const { data } = await useFetch<MediaObject[]>(
    `${config.public.motionCollectUrl}api/collections`,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        watch: [path],
    }
)

const { isLogged } = useLogged()
const { showErrorAlert } = useAlert()
</script>

<template>
    <aside class="sidepanel">
        <section class="logo">
            <img
                class="h-[48px]"
                src="../../assets/logo.svg"
                alt="Motion Collect"
            />
            <span>Motion Collect</span>
        </section>
        <section class="list">
            <Sidebutton
                @click="() => navigateTo('/')"
                :leftIcon="homeIcon"
                :selected="route.matched[0].name === 'index'"
                >Home</Sidebutton
            >
            <Sidebutton
                @click="() => navigateTo('/movies')"
                :leftIcon="moviesIcon"
                :selected="(route.matched[0].name as string).includes('movie')"
                >Movies</Sidebutton
            >
            <Sidebutton
                @click="() => navigateTo('/series')"
                :leftIcon="tvIcon"
                :selected="(route.matched[0].name as string).includes('serie')"
                >TV Series</Sidebutton
            >
            <div class="collection">
                <div class="title">
                    <img src="../../assets/collections.svg" alt="Collections" />
                    <span>Collections</span>
                    <Iconbutton
                        @click="
                            () =>
                                isLogged
                                    ? navigateTo('/collection/add')
                                    : showErrorAlert(
                                          'Error',
                                          'You need to be logged in to create a collection'
                                      )
                        "
                        class-name="mr-3"
                        size="18px"
                        :icon="plusIcon"
                    />
                </div>
            </div>
            <div class="collection_list">
                <Sidemediabutton
                    v-for="collection in data"
                    @click="() => {}"
                    :leftIcon="collectionIcon"
                    :selected="
                        (route.matched[0].name as string).includes(
                            collection.title
                        )
                    "
                    >{{ collection.title }}</Sidemediabutton
                >
            </div>
        </section>
    </aside>
</template>

<style scoped>
.sidepanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    flex: 0 0 300px;
    padding: 24px 10px 0 10px;

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
            height: calc(100vh - 428px);
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--color-accent) var(--color-background-shade);
        }
    }
}
</style>
