<script setup lang="ts">
import { useSkeletonCount } from '~/composables/useSkeletonCount'
import { useScrollEnd } from '~/composables/useScrollEnd'
import type { Movie } from '~/types/MovieDB.type'

import Mediaactions from '~/components/mediaactions.vue'
import type { CollectionObjectWithIncludes } from '~/domain/collection'
import type { MediaObject } from '~/domain/media'

const props = defineProps({
    hasAddAction: {
        type: Boolean,
        default: false,
    },
    items: {
        type: Array,
        required: true,
    },
    hasMoreItems: {
        type: Boolean,
        default: false,
    },
    mediaType: {
        type: String,
    },
})

const emit = defineEmits(['onMoreItems'])

const { skeletonCount } = useSkeletonCount()

useScrollEnd(460, () => {
    if (props.hasMoreItems) {
        emit('onMoreItems')
    }
})

const getLinkHref = (item: MediaObject & Movie) => {
    const type =
        props.mediaType ?? (item.media_type === 'movie' ? 'movie' : 'show')
    return `/${type}/${item.externalId ?? item.id}-${item.title ?? item.name}`
}

const config = useRuntimeConfig()

const { data: cachedCollectionData } =
    useNuxtData<CollectionObjectWithIncludes[]>('collections')
const { data: collections, pending } = await useLazyFetch<
    CollectionObjectWithIncludes[]
>(`${config.public.motionCollectUrl}api/collections`, {
    headers: {
        'Content-Type': 'application/json',
    },
    key: 'collections',
    default() {
        return cachedCollectionData.value
    },
})
</script>

<template>
    <div class="grid">
        <div class="poster_item" v-for="item in items" :key="item.id">
            <div class="poster--item_add-floating">
                <Wait :is-loading="!cachedCollectionData || pending">
                    <Mediaactions
                        v-if="hasAddAction"
                        :collections="
                            collections as CollectionObjectWithIncludes[]
                        "
                        :mediaItem="item as Movie"
                    />
                </Wait>
            </div>
            <NuxtLink :to="getLinkHref(item)">
                <div class="poster_item_interactive">
                    <img
                        class="poster--item_img"
                        :src="
                            item.poster_path || item.poster
                                ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                                  (item.poster_path || item.poster)
                                : 'https://fakeimg.pl/270x390?text=image'
                        "
                        alt="poster"
                    />
                    <div class="poster--item_info">
                        <h4>{{ item.title || item.name }}</h4>
                    </div>
                </div>
            </NuxtLink>
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
        border: solid 6px transparent;
        transition: transform 0.3s ease-in-out;

        &:hover {
            transform: scale(1.05);
        }

        & .poster_item_interactive {
            position: relative;
            border-radius: 16px;
            cursor: pointer;
            transition: border 0.3s ease-in-out;
            border: solid 6px transparent;
            overflow: hidden;

            &:hover {
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

        & .poster--item_add-floating {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
        }
    }
}
</style>
