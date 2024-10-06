<script lang="ts" setup>
import type { Movie } from '~/types/MovieDB.type'

const props = defineProps({
    data: Array,
})
const carrouselList = ref<HTMLUListElement | null>(null)
const carrouselItems = ref<HTMLLIElement[] | null>([])
const interval = ref<number | null>(null)
const carrouselIndex = ref(0)

const restartInterval = () => {
    if (interval.value) clearInterval(interval.value)
    interval.value = window.setInterval(() => {
        onCarrouselChangeClick(carrouselIndex.value + 1)
    }, 7000)
}

const onCarrouselChangeClick = (
    index: number,
    isResetInterval?: boolean,
    isInstantScroll?: boolean
) => {
    const carrouselElement = carrouselList.value!
    carrouselIndex.value = index >= props.data?.length! ? 0 : index ?? 0
    if (isResetInterval) restartInterval()
    if (carrouselElement) {
        if (isInstantScroll) carrouselElement.style.scrollBehavior = 'auto'
        else carrouselElement.style.scrollBehavior = 'smooth'
        carrouselElement.scrollLeft =
            carrouselItems.value![carrouselIndex.value].offsetLeft
    }
}

const getLinkHref = (item: Movie) => {
    const type = item.media_type === 'movie' ? 'movie' : 'show'
    return `/${type}/${item.id}-${item.title ?? item.name}`
}

onMounted(() => {
    restartInterval()
    window.addEventListener('resize', () =>
        onCarrouselChangeClick(carrouselIndex.value, false, true)
    )
})
</script>

<template>
    <section class="carrousel_container">
        <ul ref="carrouselList" class="carrousel">
            <li ref="carrouselItems" v-for="item in data" :key="item.id">
                <NuxtLink :to="getLinkHref(item)">
                    <img
                        :src="
                            'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces' +
                            item.backdrop_path
                        "
                        alt="backdrop"
                    />
                </NuxtLink>
            </li>
        </ul>
        <div class="blue-gradient" />
        <NuxtLink class="title" :to="getLinkHref(data[carrouselIndex])">
            <Text
                :clamp="3"
                :tooltip-content="
                    data[carrouselIndex].title ?? data[carrouselIndex].name
                "
            >
                {{ data[carrouselIndex].title ?? data[carrouselIndex].name }}
            </Text>
        </NuxtLink>
        <ul class="carrousel_menu">
            <li v-for="(item, index) in data" :key="item.id">
                <button
                    @click="onCarrouselChangeClick(index, true)"
                    class="carrousel_button"
                    :class="{ active: index === carrouselIndex }"
                />
            </li>
        </ul>
    </section>
</template>

<style scoped>
section.carrousel_container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 328px);

    @media (max-width: 1024px) {
        width: calc(100vw - 16px);
    }

    ul.carrousel {
        display: flex;
        flex-direction: row;
        scroll-behavior: smooth;
        overflow: hidden;
        & li {
            scroll-snap-align: center;
            & img {
                border-top-left-radius: 26px;
                border-top-right-radius: 26px;
                min-width: calc(100vw - 328px);
                height: auto;
                @media (max-width: 1024px) {
                    min-width: calc(100vw - 16px);
                }
            }
        }
    }

    div.blue-gradient {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 10%,
            var(--color-background) 100%
        );
    }

    & a.title {
        position: absolute;
        top: 35px;
        left: 3vw;
        font-size: 48px;
        max-width: 230px;
        text-shadow: 0 0 20px var(--color-background);
        @media (max-width: 1024px) {
            font-size: 24px;
        }
    }

    ul.carrousel_menu {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 100%;

        & button.carrousel_button {
            background-color: white;
            border: solid 2px white;
            border-radius: 20px;
            margin: 0 10px;
            width: 10px;
            height: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover,
            &.active {
                width: 20px;
            }
            &.active {
                background-color: var(--color-accent);
                border-color: var(--color-accent);
            }
        }
    }
}
</style>
