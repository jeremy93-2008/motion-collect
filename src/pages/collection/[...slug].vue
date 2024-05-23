<script setup lang="ts">
import type { MediaObject } from '~/domain/media.js'

const route = useRoute()
const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])
const [name, id] = route.params.slug

const { data } = await useFetch<MediaObject[]>(
    `${config.public.motionCollectUrl}api/collection/${id}`,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    }
)

console.log(data)
</script>
<template>Hola mundo</template>
<style></style>
