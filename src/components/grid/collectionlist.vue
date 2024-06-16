<script setup lang="ts">
import PlusIcon from 'assets/plus.svg'
import CheckIcon from 'assets/check.svg'
import CloseIcon from 'assets/close.svg'

import type { ModelRef } from 'vue'

import type { CollectionObjectWithIncludes } from '~/domain/collection'
import type { MediaObject } from '~/domain/media'
import type { Movie } from '~/types/MovieDB.type'

const props = defineProps<{ mediaItem: Movie }>()
const search = defineModel() as ModelRef<string>

const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

const { data: cachedData } = useNuxtData('collections')
const { data, status, execute } = await useLazyFetch<
    CollectionObjectWithIncludes[]
>(`${config.public.motionCollectUrl}api/collections`, {
    headers: {
        ...headers,
        'Content-Type': 'application/json',
    },
    key: 'collections',
    default() {
        return cachedData.value
    },
    onResponse: () => {
        saving.value = false
    },
})

const filteredData = computed(() => {
    return data.value?.filter((item) => {
        if (!search.value) return true
        return item.title.toLowerCase().includes(search.value.toLowerCase())
    })
})

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
    if (!inputRef.value) return
    window.setTimeout(() => {
        inputRef.value?.focus()
    }, 100)
})

const saving = ref(false)

const onAddToCollection = (collection: CollectionObjectWithIncludes) => {
    const mediaType = props.mediaItem.media_type === 'movie' ? 'movie' : 'show'
    saving.value = true
    $fetch(
        `${config.public.motionCollectUrl}api/collection/${collection.id}/${mediaType}/add`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: props.mediaItem.title ?? props.mediaItem.name,
                description:
                    props.mediaItem.overview ?? props.mediaItem.overview,
                media_type: mediaType,
                poster:
                    props.mediaItem.poster_path ??
                    props.mediaItem.backdrop_path,
                rating: props.mediaItem.vote_average,
                createdAt: props.mediaItem.release_date
                    ? `${props.mediaItem.release_date}T00:00:00.000Z`
                    : new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                director: '',
                externalId: props.mediaItem.id.toString(),
            } as Omit<MediaObject, 'id'>),
        }
    ).then(() => {
        execute()
    })
}

const includedIcons = ref(filteredData.value?.map(() => CheckIcon))

watch(filteredData, () => {
    includedIcons.value = filteredData.value?.map(() => CheckIcon)
})

const onRemoveFromCollection = (collection: CollectionObjectWithIncludes) => {
    const mediaType = props.mediaItem.media_type === 'movie' ? 'movie' : 'show'
    saving.value = true
    $fetch(
        `${config.public.motionCollectUrl}api/collection/${collection.id}/${mediaType}/delete`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:
                    collection.Movies?.find(
                        (collection_movie) =>
                            collection_movie.externalId ===
                            props.mediaItem.id.toString()
                    )?.id ??
                    collection.TVSeries?.find(
                        (collection_show) =>
                            collection_show.externalId ===
                            props.mediaItem.id.toString()
                    )?.id,
            }),
        }
    ).then(() => {
        execute()
    })
}
</script>
<template>
    <Wait overlay-portal :is-loading="saving" />
    <Wait :is-loading="status === 'pending' && !data">
        <section class="list">
            <input
                ref="inputRef"
                v-model="search"
                placeholder="Search..."
                autocomplete="off"
                class="search"
                name="search"
                type="text"
            />
            <ul class="max-h-[30vh] overflow-auto">
                <li
                    v-for="(collection, index) in filteredData"
                    :key="collection.id"
                >
                    <span class="w-40 mr-2 overflow-hidden">
                        <Text :tooltip-content="collection.title">{{
                            collection.title
                        }}</Text>
                    </span>
                    <VTooltip
                        v-if="
                            !collection.Movies?.find(
                                (collection_movie) =>
                                    collection_movie.externalId ===
                                    mediaItem.id.toString()
                            ) &&
                            !collection.TVSeries?.find(
                                (collection_show) =>
                                    collection_show.externalId ===
                                    mediaItem.id.toString()
                            )
                        "
                        placement="top"
                        distance="8"
                    >
                        <button @click="() => onAddToCollection(collection)">
                            <img :src="PlusIcon" alt="Add to this collection" />
                        </button>
                        <template #popper>
                            <span class="text-sm">
                                Add
                                <em class="text-sm">{{
                                    mediaItem.title ?? mediaItem.name
                                }}</em>
                                to this collection</span
                            >
                        </template>
                    </VTooltip>
                    <VTooltip v-else placement="top" distance="8">
                        <button
                            @click="() => onRemoveFromCollection(collection)"
                            @mouseenter="
                                () => (includedIcons[index] = CloseIcon)
                            "
                            @mouseleave="
                                () => (includedIcons[index] = CheckIcon)
                            "
                        >
                            <img
                                :src="includedIcons[index]"
                                alt="Remove to this collection"
                            />
                        </button>
                        <template #popper>
                            <span class="text-sm">
                                Remove
                                <em class="text-sm">{{
                                    mediaItem.title ?? mediaItem.name
                                }}</em>
                                from this collection</span
                            >
                        </template>
                    </VTooltip>
                </li>
            </ul>
        </section>
    </Wait>
</template>
<style scoped>
.list {
    display: flex;
    flex-direction: column;
    margin: 8px 4px;

    input.search {
        padding: 4px;
        margin-bottom: 14px;
        background-color: var(--color-background);
        border: 2px solid var(--color-background-shade);
        border-radius: 4px;
        outline: none;
        &:focus {
            border-color: var(--color-accent);
        }
    }
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px;
        margin-bottom: 8px;
        span {
            flex: 1;
        }
        button {
            padding: 8px;
            border-radius: 50%;
            border: 2px solid transparent;
            cursor: pointer;
            &:hover {
                background-color: var(--color-accent);
                border-color: var(--color-accent);
            }
            img {
                width: 12px;
                height: 12px;
            }
        }
    }
}
</style>
