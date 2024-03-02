<script setup lang="ts">
import searchIcon from '@/assets/search.svg'

const route = useRoute()

const title = computed(() => {
    switch (route.matched[0].name) {
        case 'index':
            return 'Home'
        case 'movies':
            return 'Movies'
        case 'series':
            return 'TV Series'
        default:
            return 'Motion Collect'
    }
})
</script>

<template>
    <section class="header">
        <span class="title">{{ title }}</span>
        <div class="top-right">
            <Iconbutton
                size="24px"
                :icon="searchIcon"
                class-name="mr-0 ml-[-2px]"
                variant="primary"
            />
        </div>
    </section>
</template>

<style scoped>
section.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6px 16px 12px 0;
    padding-left: 16px;

    & span.title {
        font-size: 28px;
    }
}
</style>
