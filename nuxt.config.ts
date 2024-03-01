// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    runtimeConfig: {
        public: {
            moviedbApiKey: '',
        },
    },
})
