<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useOverlayEvent } from '~/composables/useOverlayEvent'
import { Visibility } from '~/types/collections.type'

const props = defineProps<{
    title: string
    type: Visibility
    description: string
    header?: string
}>()

const title = ref(props.title)
const type = ref(props.type as Visibility)
const description = ref(props.description)

const emit = defineEmits(['onCollectionSave', 'onFieldChange', 'onLeave'])

const { onLeave } = useOverlayEvent('/collection/add')

const saving = ref(false)
const wasSubmitted = ref(false)
const error = ref({ title: '' })
const refInput = ref()

onMounted(() => {
    const input = refInput.value as HTMLInputElement
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
})

watch([title, type, description], () => {
    emit('onFieldChange', {
        title: title.value,
        type: type.value,
        description: description.value,
    })
})

const onAfterClick = (params: { isOk: boolean }) => {
    if (!params.isOk) return (saving.value = false)
    saving.value = false
    error.value.title = ''
    onLeave()
    emit('onLeave')
}

const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        wasSubmitted.value = true
    }
    if (title.value && !saving.value && event.key === 'Enter') {
        saving.value = true
        return emit('onCollectionSave', { onAfterClick })
    } else if (title.value === '' && wasSubmitted.value) {
        error.value.title = 'Name is required'
    } else if (title.value && wasSubmitted.value) {
        error.value.title = ''
    }
}
</script>

<template>
    <section
        @click="
            () => {
                onLeave()
                $emit('onLeave')
            }
        "
        class="subpage_overlay"
    />
    <section class="collection_container">
        <Wait overlay-portal :is-loading="saving" />
        <section class="collection_container_row">
            <h1 class="text-xl mt-6">
                {{ header ?? 'Create a new Collection' }}
            </h1>
            <section class="collection_container_column">
                <fieldset class="flex flex-col">
                    <input
                        ref="refInput"
                        class="collectionInput h-10"
                        v-model="title"
                        placeholder="Title of Collection"
                        @keyup="onKeyPress"
                    />
                    <span class="mt-1 text-red-500">{{ error.title }}</span>
                </fieldset>
                <select v-model="type" class="collectionInput h-10">
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="public">Public</option>
                </select>
            </section>
            <section class="collection_container_column">
                <textarea
                    class="collectionInput min-h-32"
                    v-model="description"
                    placeholder="Description of Collection"
                />
            </section>
            <section class="collection_container_column justify-end pt-2">
                <button
                    @click="$emit('onCollectionSave', { onAfterClick })"
                    :disabled="title === ''"
                    class="bg-[--color-accent] py-2 px-5 rounded-3xl border border-transparent hover:border-white active:bg-[--color-accent-shade] disabled:bg-gray-500 disabled:pointer-events-none"
                >
                    Save
                </button>
            </section>
        </section>
    </section>
</template>

<style scoped>
.collection_container {
    position: fixed;
    top: 12vh;
    left: calc(50vw - 250px);
    box-sizing: content-box;
    width: 500px;
    min-height: 50px;
    max-height: 550px;
    min-width: 400px;
    background-color: var(--color-background);
    border-radius: 20px;
    z-index: 100;
    padding: 0 30px 30px 30px;
    overflow-y: auto;
    animation: slideToTop 0.2s linear both;

    @media (max-width: 1024px) {
        left: 0;
        width: calc(100% - 60px);
        min-width: auto;
    }

    .collection_container_row {
        display: flex;

        flex-direction: column;

        .collection_container_column {
            display: flex;
            gap: 20px;

            & input,
            & textarea,
            & select {
                flex: 1;
            }
        }
    }
}
</style>
