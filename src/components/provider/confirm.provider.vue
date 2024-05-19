<script setup lang="ts">
import type { ConfirmationProvider } from '~/composables/useConfirmation'
import MaterialSymbolsInfo from '~/components/icons/info.vue'
import MaterialSymbolsWarning from '~/components/icons/warning.vue'
import MaterialSymbolsError from '~/components/icons/error.vue'

const app = useNuxtApp()

const confirmation = ref<ConfirmationProvider>({
    type: 'info',
    title: '',
    message: '',
    show: false,
    onOk: () => {},
    onCancel: () => {},
})

app.vueApp.provide('confirmationProvider', confirmation)
</script>

<template>
    <section v-if="confirmation.show">
        <section @click="confirmation.onCancel" class="subpage_overlay" />
        <section class="confirmation_container">
            <h1>
                <MaterialSymbolsInfo
                    :class="`icon_${confirmation.type}`"
                    v-if="confirmation.type === 'info'"
                />
                <MaterialSymbolsWarning
                    :class="`icon_${confirmation.type}`"
                    v-if="confirmation.type === 'warning'"
                />
                <MaterialSymbolsError
                    :class="`icon_${confirmation.type}`"
                    v-if="confirmation.type === 'error'"
                />
                {{ confirmation.title }}
            </h1>
            <p>{{ confirmation.message }}</p>
            <div class="flex justify-end gap-4 mt-4">
                <button
                    @click="confirmation.onCancel"
                    class="bg-transparent py-2 px-5 rounded-3xl border border-gray-600 hover:border-gray-300 active:border-gray-300 active:bg-gray-900 disabled:pointer-events-none"
                >
                    Cancel
                </button>
                <button
                    @click="confirmation.onOk"
                    class="bg-[--color-accent] py-2 px-5 rounded-3xl border border-transparent hover:border-white active:bg-[--color-accent-shade] disabled:pointer-events-none"
                >
                    Ok
                </button>
            </div>
        </section>
    </section>
</template>

<style scoped>
.confirmation_container {
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
