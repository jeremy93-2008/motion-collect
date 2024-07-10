<script setup lang="ts">
import { useHeaderTitle } from '~/composables/useHeaderTitle'

defineProps(['isSmall'])
import Profileuser from '@/components/default/profileuser.client.vue'
import searchIcon from '@/assets/search.svg'
import loadingIcon from '@/assets/loading.svg'
import { useHeaderLink } from '~/composables/useHeaderLink'

const route = useRoute()
const motion_page_title = useHeaderTitle()
const link_href = useHeaderLink()

const menuIsOpen = useState('MenuIsOpen')
</script>

<template>
    <section class="header">
        <section class="top-left flex gap-4 items-top">
            <section @click="menuIsOpen = true" class="logo-responsive">
                <img
                    class="h-[32px]"
                    src="../../assets/logo.svg"
                    alt="Motion Collect"
                />
            </section>
            <Text :tooltip-content="motion_page_title">
                <span class="title">
                    <NuxtLink v-if="link_href" :to="link_href">
                        {{ motion_page_title }}
                    </NuxtLink>
                    <span v-else>{{ motion_page_title }}</span>
                </span>
            </Text>
        </section>
        <div class="top-right">
            <NuxtLink
                class="search-button"
                :class="{
                    disabled: route.path.includes('/search'),
                }"
                :to="route.path === '/' ? `/search` : route.path + `/search`"
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

    & .logo-responsive {
        display: none;
    }

    @media (max-width: 768px) {
        align-items: center;
        & .logo-responsive {
            margin-left: 8px;
            display: block;
        }
    }

    & section.top-left {
        @media (max-width: 768px) {
            min-width: 70%;
            flex: 0;
        }
        .logo-responsive {
            flex-basis: 64px;
        }
        & span.title {
            font-size: 28px;
            transition: font-size 0.1s linear;

            @media (max-width: 768px) {
                flex: 1;
                font-size: 22px;
                width: 50%;

                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
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
