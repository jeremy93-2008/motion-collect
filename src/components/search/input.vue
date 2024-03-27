<script setup lang="ts">
import searchIcon from 'assets/search.svg'

const props = defineProps(['value'])
const emit = defineEmits(['onChange'])

const inputVal = ref(props.value)
const refInput = ref()
onMounted(() => {
    const input = refInput.value as HTMLInputElement
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
})

watch(
    () => props.value,
    (val) => {
        inputVal.value = val
    }
)

watch(inputVal, (val) => {
    emit('onChange', val)
})
</script>

<template>
    <div class="search_input_container">
        <img :src="searchIcon" alt="search" />
        <input
            v-model="inputVal"
            ref="refInput"
            class="search_input_value"
            placeholder="Search for movies, tv series and collection"
        />
    </div>
</template>

<style scoped>
.search_input_container {
    display: flex;
    border: 2px solid var(--color-background-shade);
    border-radius: 10px;
    &:focus-within {
        border: 2px solid var(--color-accent);
    }
    & img {
        padding-left: 12px;
    }
    & input.search_input_value {
        width: 100%;
        background-color: transparent;
        padding: 16px 20px 12px 12px;
        font-size: 18px;
        &:focus {
            outline: none;
        }
    }
}
</style>
