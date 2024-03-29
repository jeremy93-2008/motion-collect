<script setup lang="ts">
import { useSkeletonCount } from '~/composables/useSkeletonCount'
import { useScrollEnd } from '~/composables/useScrollEnd'

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    hasMoreItems: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['onMoreItems'])

const { skeletonCount } = useSkeletonCount()

useScrollEnd(460, () => {
    if (props.hasMoreItems) {
        emit('onMoreItems')
    }
})
</script>

<template>
    <div class="grid">
        <div class="poster_item" v-for="item in items" :key="item.id">
            <img
                class="poster--item_img"
                :src="
                    item.poster_path
                        ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                          item.poster_path
                        : 'https://fakeimg.pl/270x390?text=image'
                "
                alt="poster"
            />
            <div class="poster--item_info">
                <h4>{{ item.title || item.name }}</h4>
            </div>
        </div>
        <Skeletongrid v-if="hasMoreItems" :count="skeletonCount" />
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    margin: 0 24px 0 16px;
    & .poster_item {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        transition:
            transform 0.3s ease-in-out,
            border 0.3s ease-in-out;
        border: solid 6px transparent;

        &:hover {
            transform: scale(1.05);
            border: solid 6px var(--color-accent);
        }

        & .poster--item_img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        & .poster--item_info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px;
            background-color: rgba(0, 0, 0, 0.7);
            & h4 {
                color: white;
                font-size: 16px;
                margin: 0;
            }
        }
    }
}
</style>
