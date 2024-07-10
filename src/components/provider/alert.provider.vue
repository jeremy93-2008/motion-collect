<script setup lang="ts">
import type { AlertProvider } from '~/composables/useAlert'
import MaterialSymbolsInfo from '~/components/icons/info.vue'
import MaterialSymbolsWarning from '~/components/icons/warning.vue'
import MaterialSymbolsError from '~/components/icons/error.vue'

const app = useNuxtApp()

const alert = ref<AlertProvider>({
    type: 'info',
    title: '',
    message: '',
    show: false,
})

app.vueApp.provide('alertProvider', alert)

const onClose = () => {
    alert.value.show = false
}

onMounted(() => {
    const handle = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape' || evt.key === 'Enter')
            alert.value.show = false
    }

    window.addEventListener('keyup', handle)

    return () => {
        window.removeEventListener('keyup', handle)
    }
})
</script>

<template>
    <section v-if="alert.show">
        <section @click="onClose" class="subpage_overlay" />
        <section class="alert_container">
            <h1>
                <MaterialSymbolsInfo
                    :class="`icon_${alert.type}`"
                    v-if="alert.type === 'info'"
                />
                <MaterialSymbolsWarning
                    :class="`icon_${alert.type}`"
                    v-if="alert.type === 'warning'"
                />
                <MaterialSymbolsError
                    :class="`icon_${alert.type}`"
                    v-if="alert.type === 'error'"
                />
                {{ alert.title }}
            </h1>
            <p>{{ alert.message }}</p>
            <div class="flex justify-end mt-4">
                <button
                    @click="onClose"
                    class="bg-[--color-accent] py-2 px-5 rounded-3xl border border-transparent hover:border-white active:bg-[--color-accent-shade] disabled:bg-gray-500 disabled:pointer-events-none"
                >
                    Ok
                </button>
            </div>
        </section>
    </section>
</template>

<style scoped>
.alert_container {
    position: fixed;
    top: 12vh;
    left: calc(50vw - 250px);
    box-sizing: content-box;
    width: 500px;
    min-height: 50px;
    max-height: 550px;
    min-width: 400px;
    background-color: var(--color-background);
    border-radius: 20px;
    z-index: 100;
    padding: 0 30px 30px 30px;
    overflow-y: auto;
    animation: slideToTop 0.2s linear both;

    @media (max-width: 768px) {
        width: calc(100% - 60px);
        left: 0;
        min-width: 0;
        min-height: 0;
    }

    h1 {
        font-size: 24px;
        margin: 24px 0 12px 0;
        display: flex;
        align-items: center;
        svg {
            width: 32px;
            height: 32px;
            margin-right: 8px;

            &.icon_info {
                color: var(--color-info);
            }
            &.icon_warning {
                color: var(--color-warning);
            }
            &.icon_error {
                color: var(--color-error);
            }
        }
    }
}
</style>
