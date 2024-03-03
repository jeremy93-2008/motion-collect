import { clerkPlugin } from 'vue-clerk/plugin'
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    nuxtApp.vueApp.use(clerkPlugin, {
        publishableKey: config.public.clerkPublishableKey,
        domain: config.public.clerkDomainUrl,
    })
})
