<script setup lang="ts">
import PlusIcon from 'assets/plus.svg'
import type { ModelRef } from 'vue'

import type { MediaObject } from '~/domain/media'

const search = defineModel() as ModelRef<string>

const config = useRuntimeConfig()
const headers = useRequestHeaders(['cookie'])

const { data, pending } = await useLazyFetch<MediaObject[]>(
    `${config.public.motionCollectUrl}api/collections`,
    {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    }
)

const filteredData = computed(() => {
    return data.filter((item) =>
        item.title.toLowerCase().includes(search.value.toLowerCase())
    )
})

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
    // Due to the animation of the dropdown, we need to wait a bit before focusing the input
    window.setTimeout(() => {
        if (!inputRef.value) return
        inputRef.value.focus()
    }, 100)
})
</script>
<template>
    <Wait :is-loading="pending">
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
            <ul>
                <li v-for="item in data" :key="item.id">
                    <span>{{ item.title }}</span>
                    <VTooltip placement="top" distance="8">
                        <button>
                            <img :src="PlusIcon" alt="Add to this collection" />
                        </button>
                        <template #popper>Add to this collection</template>
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
        margin-bottom: 12px;
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
