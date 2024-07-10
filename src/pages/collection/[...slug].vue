<script setup lang="ts">
import type { CollectionObjectWithIncludes } from '~/domain/collection'
import Collectionprompt from '~/components/collectionprompt/collectionprompt.vue'
import EditIcon from '@/assets/edit.svg'
import TrashIcon from '@/assets/trash.svg'
import { Visibility } from '~/types/collections.type'

const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])
const [id, name] = route.params.slug

const { data, pending, refresh } = await useFetch<CollectionObjectWithIncludes>(
    `${config.public.motionCollectUrl}api/collection/${id}`,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    }
)

const titles = useState<Record<string, string>>('titles')
titles.value = {
    ...titles.value,
    '/collection/:slug(.*)*': data.value?.title ?? '',
}
const windowWidth = useState<number>('windowWidth')

const { showInfoAlert, showErrorAlert } = useAlert()

const isEdit = ref(false)
const onEdit = () => {
    isEdit.value = true
}
const collectionTitle = ref(data.value?.title as string)
const collectionType = ref(data.value?.visibility as Visibility)
const collectionDescription = ref(data.value?.description as string)

const onSaveEdit = ({
    onAfterClick,
}: {
    onAfterClick: (params: { isOk: boolean }) => void
}) => {
    $fetch(`${config.public.motionCollectUrl}api/collection/update`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: data.value?.id,
            title: collectionTitle.value,
            visibility: collectionType.value,
            description: collectionDescription.value,
        }),
    })
        .then(() => {
            onAfterClick({ isOk: true })
            navigateTo(`/collection/${data.value?.id}/${collectionTitle.value}`)
            refresh()
        })
        .catch(() => {
            onAfterClick({ isOk: false })
            showErrorAlert(
                'Failed to update collection',
                'Something went wrong. Please try again'
            )
        })
}
const { confirmErrorAlert } = useConfirmation()
const onDelete = () => {
    confirmErrorAlert(
        'Delete this collection',
        'Are you sure you want to delete this collection?'
    ).then((isOk) => {
        if (!isOk) return
        $fetch(`${config.public.motionCollectUrl}api/collection/delete`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.value?.id,
            }),
        })
            .then(() => {
                navigateTo(`/`)
                showInfoAlert(
                    'Collection deleted',
                    'Collection has been deleted'
                )
            })
            .catch(() => {
                showErrorAlert(
                    'Failed to delete collection',
                    'Something went wrong. Please try again'
                )
            })
    })
}

const isShowMoreVisible = ref(false)
const isShowMore = ref(false)
const onShowMore = () => {
    isShowMore.value = !isShowMore.value
}

onMounted(() => {
    isShowMoreVisible.value =
        (document.querySelector('.single_collections_description')
            ?.scrollHeight ?? 0) >
        (document.querySelector('.single_collections_description')
            ?.clientHeight ?? 0)
})

watch([data, pending], () => {
    isShowMoreVisible.value =
        (document.querySelector('.single_collections_description')
            ?.scrollHeight ?? 0) >
        (document.querySelector('.single_collections_description')
            ?.clientHeight ?? 0)
})
</script>
<template>
    <NuxtPage />
    <Collectionprompt
        v-if="isEdit"
        :header="`Edit Collection - ${data?.title}`"
        :title="collectionTitle"
        :type="collectionType"
        :description="collectionDescription"
        @onLeave="isEdit = false"
        @onFieldChange="
            ({ title, type, description }) => {
                collectionTitle = title
                collectionType = type
                collectionDescription = description
            }
        "
        @onCollectionSave="onSaveEdit"
    />
    <section class="single_collection_actions mb-2">
        <button
            @click="onEdit"
            class="single_collection_edit_btn"
            :class="{ mobile: windowWidth <= 768 }"
        >
            <img alt="Edit Icon" :src="EditIcon" />
            <span>Edit</span>
        </button>
        <button
            @click="onDelete"
            class="single_collection_trash_btn"
            :class="{ mobile: windowWidth <= 768 }"
        >
            <img alt="Delete Icon" :src="TrashIcon" />
            <span>Delete</span>
        </button>
    </section>

    <section v-if="data?.description">
        <section
            @click="onShowMore"
            class="single_collections_description"
            :class="{
                showMore: isShowMore,
                showMoreVisible: isShowMoreVisible,
            }"
        >
            {{ data?.description }}
        </section>
        <section v-if="isShowMoreVisible" @click="onShowMore" class="show_more">
            {{ isShowMore ? 'Show less' : 'Show more' }}
        </section>
    </section>

    <Wait :isLoading="pending">
        <Grid
            v-if="data"
            :items="[
                ...(data as CollectionObjectWithIncludes).Movies?.map((m) => ({
                    ...m,
                    media_type: 'movie',
                }))!,
                ...(data as CollectionObjectWithIncludes).TVSeries?.map(
                    (m) => ({
                        ...m,
                        media_type: 'show',
                    })
                )!,
            ]"
            :hasMoreItems="false"
        />
    </Wait>
</template>
<style scoped>
.single_collection_actions {
    display: flex;
    gap: 0.5rem;

    .single_collection_edit_btn,
    .single_collection_trash_btn {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        font-size: 12px;
        padding: 6px 12px;
        border-radius: 4px;

        &.mobile {
            padding: 8px 16px;
        }

        &:hover {
            background-color: var(--color-accent);
        }

        img {
            width: 16px;
            height: 16px;
        }
    }
}
.single_collections_description {
    flex: 0 0 auto;
    min-height: 0;
    display: flex;
    padding: 8px 16px 0 4px;
    margin-bottom: 8px;
    font-size: 14px;
    cursor: default;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    &.showMore {
        -webkit-line-clamp: unset;
    }

    &.showMoreVisible {
        margin-bottom: 0;
    }
}
.show_more {
    padding: 0 16px 0 4px;
    margin-bottom: 8px;
    font-size: 12px;
    font-style: italic;
    color: #ccc;
    cursor: default;
}
</style>
