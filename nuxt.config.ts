// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    build: {
        transpile: ['vue-clerk', '@clerk/clerk-js'],
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    runtimeConfig: {
        clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
        public: {
            moviedbApiKey: process.env.NUXT_PUBLIC_MOVIEDB_API_KEY,
            clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            clerkDomainUrl: process.env.NUXT_PUBLIC_CLERK_DOMAIN_URL,
            motionCollectUrl: process.env.NUXT_PUBLIC_MOTION_URL,
        },
    },
    css: ['~/styles/variables.css', '~/styles/base.css'],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap',
                },
            ],
        },
    },
})
