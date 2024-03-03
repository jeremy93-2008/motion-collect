<script setup lang="ts">
import homeIcon from 'assets/home.svg'
import moviesIcon from 'assets/movies.svg'
import tvIcon from 'assets/tv.svg'

import plusIcon from 'assets/plus.svg'

import Sidebutton from './sidebutton.vue'
import Iconbutton from '../iconbutton.vue'

const route = useRoute()
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
                :selected="route.matched[0].name === 'movies'"
                >Movies</Sidebutton
            >
            <Sidebutton
                @click="() => navigateTo('/series')"
                :leftIcon="tvIcon"
                :selected="route.matched[0].name === 'series'"
                >TV Series</Sidebutton
            >
            <div class="collection">
                <div class="title">
                    <img src="../../assets/collections.svg" alt="Collections" />
                    <span>Collections</span>
                    <Iconbutton
                        class-name="mr-3"
                        size="16px"
                        :icon="plusIcon"
                    />
                </div>
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
            margin: 24px 32px;

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
    }
}
</style>
