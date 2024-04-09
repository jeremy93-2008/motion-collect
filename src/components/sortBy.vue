<script setup lang="ts">
import { useSortByRoute } from '~/composables/useSortByRoute'

const options = [
    { value: 'popularity', text: 'Popularity' },
    { value: 'vote_count', text: 'Vote' },
    { value: 'title', text: 'Title' },
    { value: 'primary_release_date', text: 'Release Date' },
    { value: 'original_title', text: 'Original Title' },
    { value: 'revenue', text: 'Revenue' },
    { value: 'vote_average', text: 'Vote Average' },
]

const { selectedSortBy, selectedOption, selectedDirection } =
    useSortByRoute(options)

const onDirectionChange = () => {
    selectedDirection.value = selectedDirection.value === 'asc' ? 'desc' : 'asc'
}

const isScrolling = useState('isScrolling')
</script>

<template>
    <div class="sort-by__container" :class="{ small: isScrolling }">
        <p>Sort by</p>
        <div class="sort-by">
            <select v-model="selectedOption" @change="$emit('onChange')">
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div class="direction">
            <Icon
                @click="onDirectionChange"
                :class="{ desc: selectedDirection === 'desc' }"
                name="material-symbols:arrow-upward"
            />
        </div>
    </div>
</template>

<style scoped>
.sort-by__container {
    position: sticky;
    top: 70px;
    background-color: var(--color-background);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 32px 10px 32px;
    margin-bottom: 10px;

    p {
        margin-right: 8px;
    }

    div.sort-by {
        padding-right: 8px;
        border-radius: 8px;
        border: 1px solid #ccc;
        background-color: var(--color-background);
        user-select: none;

        select {
            padding: 8px;
            border-radius: 8px;
            background-color: var(--color-background);
            outline: none;
            transition: font-size 0.2s linear;
        }
    }

    div.direction {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 8px;
        font-size: 24px;

        .icon {
            border-radius: 50%;
            cursor: pointer;
            padding: 8px;
            box-sizing: content-box;
            transition:
                background-color 0.2s linear,
                transform 0.2s linear;

            &.desc {
                transform: rotate(180deg);
            }
        }

        .icon:hover {
            background-color: var(--color-background-shade);
        }

        .icon:active {
            background-color: var(--color-accent);
        }
    }

    &.small {
        top: 55px;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.4);
        p {
            font-size: 14px;
        }
        div.sort-by {
            select {
                font-size: 14px;
            }
        }
        div.direction {
            font-size: 18px;
        }
    }
}
</style>
