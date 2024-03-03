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
    plugins: ['plugins/clerk.client.ts'],
    runtimeConfig: {
        public: {
            moviedbApiKey: process.env.NUXT_PUBLIC_MOVIEDB_API_KEY,
            clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            clerkDomainUrl: process.env.NUXT_PUBLIC_CLERK_DOMAIN_URL,
        },
    },
})
