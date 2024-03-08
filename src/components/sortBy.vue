<script setup lang="ts">
const route = useRoute()

const isScrolling = useState<boolean>('isScrolling')
const selectedSortBy = ref(route.query.sort_by ?? 'popularity.desc')

onMounted(() => {
    if (route.query.sort_by) return
    navigateTo({ query: { sort_by: selectedSortBy.value } })
})

watch(selectedSortBy, () => {
    navigateTo({ query: { sort_by: selectedSortBy.value } })
})
</script>

<template>
    <div class="sort-by__container" :class="{ small: isScrolling }">
        <p>Sort by</p>
        <div class="sort-by">
            <select v-model="selectedSortBy" @change="$emit('onChange')">
                <option value="popularity.desc">Popularity</option>
                <option value="vote_average.desc">Rating</option>
                <option value="primary_release_date.desc">Release Date</option>
                <option value="original_title.asc">Title</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.sort-by__container {
    position: sticky;
    top: 55px;
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

        select {
            padding: 8px;
            border-radius: 8px;
            background-color: var(--color-background);
            outline: none;
            transition: font-size 0.2s linear;
        }
    }

    &.small {
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.4);
        p {
            font-size: 14px;
        }
        div.sort-by {
            select {
                font-size: 14px;
            }
        }
    }
}
</style>
