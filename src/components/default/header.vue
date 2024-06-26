<script setup lang="ts">
import { useHeaderTitle } from '~/composables/useHeaderTitle'

defineProps(['isSmall'])
import Profileuser from '@/components/default/profileuser.client.vue'
import searchIcon from '@/assets/search.svg'
import loadingIcon from '@/assets/loading.svg'

const route = useRoute()

const motion_page_title = useHeaderTitle()
</script>

<template>
    <section class="header">
        <span class="title">
            {{ motion_page_title }}
        </span>
        <div class="top-right">
            <NuxtLink
                class="search-button"
                :class="{ disabled: route.path.includes('/search') }"
                :to="route.path === '/' ? '/search' : route.path + '/search'"
            >
                <Iconbutton
                    :size="isSmall ? '16px' : '26px'"
                    :icon="searchIcon"
                    :class-name="`mr-0 ml-[-2px]`"
                    variant="primary"
                />
            </NuxtLink>
            <client-only>
                <Profileuser />
                <template #fallback>
                    <img
                        class="mini-loading"
                        :src="loadingIcon"
                        alt="loading"
                    />
                </template>
            </client-only>
        </div>
    </section>
</template>

<style scoped>
section.header {
    position: sticky;
    top: 0;
    background-color: var(--color-background);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 16px 12px 0;
    transition: padding 0.1s linear;

    & span.title {
        font-size: 28px;
        transition: font-size 0.1s linear;
    }

    & div.top-right {
        display: flex;
        gap: 14px;
        align-items: center;
        img.mini-loading {
            animation: spinning 1s linear infinite;
        }
        & .search-button.disabled {
            pointer-events: none;
            opacity: 0.5;
        }
        & button.iconbutton {
            flex: 1;
        }
        margin-right: 8px;
    }

    &.small {
        padding: 12px 8px 12px 16px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        & span.title {
            font-size: 22px;
        }
        & div.top-right {
            gap: 18px;
            margin-right: 16px;

            & button.iconbutton {
                padding: 6px;
            }
        }
    }

    @keyframes spinning {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
