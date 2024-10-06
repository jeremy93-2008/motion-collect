<script setup lang="ts">
import SortBy from '~/components/sortBy.vue'

const isScrolling = useState('isScrolling')
</script>
<template>
    <section class="movies_options" :class="{ small: isScrolling }">
        <Filter />
        <SortBy />
    </section>
</template>
<style>
.movies_options {
    position: sticky;
    top: 68px;
    background-color: var(--color-background);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    margin-bottom: 10px;

    &.small {
        top: 55px;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.4);
        div.sort-by__container {
            p {
                font-size: 14px;
            }
            .sort-by {
                select {
                    font-size: 14px;
                }
            }
            div.direction {
                font-size: 18px;
            }
        }
    }
}
</style>
