<script lang="ts" setup>
const props = defineProps({
    data: Array,
})
const carrousel = ref<HTMLUListElement | null>(null)
const interval = ref<number | null>(null)
const carrouselIndex = ref(0)

const restartInterval = () => {
    if (interval.value) clearInterval(interval.value)
    interval.value = window.setInterval(() => {
        onCarrouselChangeClick(carrouselIndex.value + 1)
    }, 7000)
}

const onCarrouselChangeClick = (index: number, isResetInterval?: boolean) => {
    const carrouselElement = carrousel.value!
    carrouselIndex.value = index >= props.data?.length! ? 0 : index ?? 0
    if (isResetInterval) restartInterval()
    if (carrouselElement) {
        carrouselElement.scrollLeft =
            carrouselIndex.value * carrouselElement.clientWidth
    }
}

onMounted(() => {
    restartInterval()
})
</script>

<template>
    <section class="carrousel_container">
        <ul ref="carrousel" class="carrousel">
            <li v-for="item in data" :key="item.id">
                <img
                    :src="
                        'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces' +
                        item.backdrop_path
                    "
                    alt="backdrop"
                />
            </li>
        </ul>
        <div class="blue-gradient" />
        <span class="title">{{
            data[carrouselIndex].title ?? data[carrouselIndex].name
        }}</span>
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

    ul.carrousel {
        display: flex;
        flex-direction: row;
        scroll-behavior: smooth;
        overflow-x: hidden;
        & li {
            scroll-snap-align: center;
            & img {
                border-top-left-radius: 26px;
                border-top-right-radius: 26px;
                min-width: calc(100vw - 328px);
                height: auto;
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

    & span.title {
        position: absolute;
        top: 35px;
        left: 3vw;
        font-size: 48px;
        max-width: 200px;
        text-shadow: 0 0 20px var(--color-background);
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
