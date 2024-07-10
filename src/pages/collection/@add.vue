<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { Visibility } from '~/types/collections.type'
import Collectionprompt from '~/components/collectionprompt/collectionprompt.vue'

const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

const title = ref('')
const type = ref('private' as Visibility)
const description = ref('')

const onFieldChange = (fields: {
    title: string
    type: Visibility
    description: string
}) => {
    title.value = fields.title
    type.value = fields.type
    description.value = fields.description
}

const onClick = ({
    onAfterClick,
}: {
    onAfterClick: (params: { isOk: boolean }) => void
}) => {
    $fetch(`${config.public.motionCollectUrl}api/collection/create`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title.value,
            visibility: type.value,
            description: description.value,
        }),
    })
        .then(() => {
            onAfterClick({ isOk: true })
        })
        .catch(() => {
            onAfterClick({ isOk: false })
        })
}
</script>

<template>
    <Collectionprompt
        :title="title"
        :type="type"
        :description="description"
        @onFieldChange="onFieldChange"
        @onCollectionSave="onClick"
    />
</template>
