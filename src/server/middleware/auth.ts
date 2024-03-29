import clerk from '@clerk/clerk-sdk-node'
import { type SignedInAuthObject } from '@clerk/backend'
import { User } from '@prisma/client'

import { prisma } from '~/lib/prisma'

declare module 'h3' {
    interface H3EventContext {
        auth: SignedInAuthObject
        user: User
    }
}

export default defineEventHandler(async (event) => {
    if (!event.node.req.url?.includes('/api')) return

    const authState = await clerk.authenticateRequest({
        request: event.web?.request,
        publishableKey: useRuntimeConfig(event).public.clerkPublishableKey,
        secretKey: useRuntimeConfig(event).clerkSecretKey,
        headerToken: getCookie(event, '__session'),
        loadSession: true,
        loadUser: true,
    })

    if (!authState.isSignedIn)
        throw createError({
            statusCode: 401,
            message: (process.env.NODE_ENV = 'development'
                ? authState.message
                : 'Unauthorized'),
        })

    event.context.auth = authState.toAuth()

    event.context.user = await prisma.user.upsert({
        where: { id: event.context.auth.userId },
        update: {
            email: event.context.auth.user!.emailAddresses[0].emailAddress,
            name: event.context.auth.user!.username,
            password: 'hidden',
            profileUrl: event.context.auth.user!.imageUrl,
        },
        create: {
            id: event.context.auth.userId,
            email: event.context.auth.user!.emailAddresses[0].emailAddress,
            name: event.context.auth.user!.username,
            password: 'hidden',
            profileUrl: event.context.auth.user!.imageUrl,
        },
    })
})
