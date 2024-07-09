<script setup lang="ts">
import searchIcon from 'assets/search.svg'
import cancelIcon from 'assets/cancel.svg'

const props = defineProps(['value'])
const emit = defineEmits(['onChange', 'onEnter'])

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
        <div class="search_input_border">
            <img class="search_input_glass" :src="searchIcon" alt="search" />
            <input
                v-model="inputVal"
                ref="refInput"
                class="search_input_value"
                placeholder="Search for movies, tv series and collection"
                @keydown.enter="() => emit('onEnter', inputVal)"
            />
            <Icon
                v-if="inputVal !== ''"
                @click="() => (inputVal = '')"
                class="search_input_cancel"
                name="material-symbols:cancel"
                color="gray"
                size="34px"
            />
        </div>
    </div>
</template>

<style scoped>
.search_input_container {
    position: sticky;
    top: -16px;
    display: flex;
    padding-top: 30px;
    background-color: var(--color-background);
    .search_input_border {
        display: flex;
        align-items: center;
        flex: 1;
        background-color: var(--color-background);
        border: 2px solid var(--color-background-shade);
        border-radius: 10px;
        &:focus-within {
            border: 2px solid var(--color-accent);
        }
        & img.search_input_glass {
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
        & svg.search_input_cancel {
            padding-right: 12px;
            cursor: pointer;
        }
    }
}
</style>
