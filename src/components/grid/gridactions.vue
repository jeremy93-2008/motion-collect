<script setup lang="ts">
import CollectionList from '~/components/grid/collectionlist.vue'
import PlusIcon from 'assets/plus.svg'
import CollectionIcon from 'assets/collection.svg'
import type { CollectionObject } from '~/domain/collection'
import type { FullMovie, FullTV, Movie } from '~/types/MovieDB.type'

const props = defineProps<{
    mediaItem: Movie | FullMovie | FullTV
    collections: CollectionObject[]
}>()

const dropdownId = useId()
const tooltipId = useId()

const collectionsIncludingMediaItem = computed(() => {
    if (!props.collections) return []
    return props.collections.filter(
        (collection) =>
            collection.Movies?.some(
                (movie) =>
                    movie.externalId.toString() ===
                    props.mediaItem.id.toString()
            ) ||
            collection.TVSeries?.some(
                (show) =>
                    show.externalId.toString() === props.mediaItem.id.toString()
            )
    )
})

const nOfCollectionsIncludingMediaItem = computed(() => {
    return collectionsIncludingMediaItem.value.length
})
</script>
<template>
    <section class="flex">
        <section
            v-if="nOfCollectionsIncludingMediaItem > 0"
            class="poster--item__collection-counter text-sm gap-2"
            v-tooltip="{
                content:
                    'This media is included in: <ul>' +
                    collectionsIncludingMediaItem
                        ?.map((collection) => `<li>- ${collection.title}</li>`)
                        .join('') +
                    '</ul>',
                placement: 'bottom',
                html: true,
            }"
        >
            <img width="16px" :src="CollectionIcon" alt="Collections" />
            <span>{{ nOfCollectionsIncludingMediaItem }}</span>
        </section>
        <VDropdown :aria-id="dropdownId" distance="8">
            <VTooltip :aria-id="tooltipId" placement="bottom" distance="8">
                <div
                    class="poster--item_add-button"
                    :class="{
                        'border-full': nOfCollectionsIncludingMediaItem === 0,
                    }"
                >
                    <img :src="PlusIcon" alt="Add to a collection" />
                </div>
                <template #popper>Add to a collection</template>
            </VTooltip>
            <template #popper>
                <CollectionList :mediaItem="mediaItem" />
            </template>
        </VDropdown>
    </section>
</template>
<style scoped>
.poster--item__collection-counter {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--color-accent);
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    padding: 4px 10px;
}
.poster--item_add-button {
    padding: 8px;
    background: var(--color-accent);
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border: solid 3px transparent;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &.border-full {
        border-radius: 50%;
    }

    &:hover {
        background: var(--color-accent-darker);
    }

    & img {
        width: 24px;
        height: 24px;
    }
}
</style>
