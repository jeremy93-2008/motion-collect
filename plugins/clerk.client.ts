import { clerkPlugin } from 'vue-clerk/plugin'
import { dark } from '@clerk/themes'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    nuxtApp.vueApp.use(clerkPlugin, {
        publishableKey: config.public.clerkPublishableKey,
        options: {
            appearance: {
                baseTheme: dark,
                variables: {
                    colorText: '#EDF2F4',
                    colorBackground: '#32364b',
                    colorPrimary: '#D80032',
                    colorDanger: '#FF0000',
                },
            },
        },
    })
})
