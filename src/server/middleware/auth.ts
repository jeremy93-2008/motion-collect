import clerk from '@clerk/clerk-sdk-node'
import { getHeaders } from 'h3'
export default defineEventHandler(async (event) => {
    if (!event.node.req.url?.includes('/api')) return

    const session = await clerk.authenticateRequest({
        publishableKey: useRuntimeConfig(event).public.clerkPublishableKey,
        secretKey: useRuntimeConfig(event).clerkSecretKey,
        headerToken: getHeaders(event).authorization?.replace('Bearer ', ''),
    })

    if (!session.isSignedIn)
        throw createError({
            statusCode: 401,
            message: (process.env.NODE_ENV = 'development'
                ? session.message
                : 'Unauthorized'),
        })

    event.context.userId = session.toAuth().userId
})
