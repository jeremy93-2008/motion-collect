<script setup lang="ts"></script>
<template>
    <section class="filter__container__info">
        <button
            class="bg-[--color-background] py-2 px-5 rounded-3xl border border-transparent border-[--color-background-shade] hover:border-white active:bg-[--color-background-shade] disabled:bg-gray-500 disabled:pointer-events-none"
        >
            Show Filter
        </button>
        <div class="filter__container__info__tags">
            <span class="tag">Action</span>
            <span class="tag">Adventure</span>
            <span class="tag">Animation</span>
            <span class="tag">Action</span>
            <span class="tag">Adventure</span>
            <span class="tag">Animation</span>
            <span class="tag">Action</span>
            <span class="tag">Adventure</span>
            <span class="tag">Animation</span>
            <span class="tag">Action</span>
            <span class="tag">Adventure</span>
            <span class="tag">Animation</span>
        </div>
    </section>
    <section class="filter__container__modal"></section>
    <!--
            Advanced Filters
                Certification - +13, +18, etc or MA-13, R, etc (use in conjunction with region)
                certification.gte - +13, +18, etc or MA-13, R, etc
                certification.lte - +13, +18, etc or MA-13, R, etc

                region - ES, US, DE, etc

                primary_release_year
                primary_release_date.gte
                primary_release_date.lte

                vote_average.gte
                vote_average.lte
                vote_count.gte
                vote_count.lte

                watch_region - ES, US, DE, etc
                with_watch_monetization_types - flatrate, rent, buy
                with_watch_providers - 8, 119, 337, 8, 119, 337, 8, 119, 337, etc

                with_genres - 28, 12, 16, etc
                without_genres - 28, 12, 16, etc

                with_keywords - 28, 12, 16, etc
                without_keywords - 28, 12, 16, etc

                with_runtime.gte - Runtime in minutes. Only include movies with runtime greater than this value.
                with_runtime.lte - Runtime in minutes. Only include movies with runtime less than this value.

                with_origin_country - US, GB, etc
        -->
</template>
<style scoped>
.filter__container__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 10px;
    gap: 16px;
    flex: 1;
    button {
        flex: 0 0 150px;
    }

    .filter__container__info__tags {
        display: flex;
        flex: 1;
        gap: 10px;
        flex-wrap: wrap;
        .tag {
            background-color: var(--color-background-shade);
            color: var(--color-text);
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 14px;
            user-select: none;
        }
    }
}
</style>
