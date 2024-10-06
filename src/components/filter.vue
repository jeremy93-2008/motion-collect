<script setup lang="ts"></script>
<template>
    <section class="filter__container"></section>
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
<style scoped></style>
