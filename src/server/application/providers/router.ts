import { createRouter, EventHandler, EventHandlerRequest } from 'h3'
import { CachedEventHandlerOptions } from 'nitropack'

interface IRouteHandleOptions {
    cache?: boolean
    cacheOptions?: CachedEventHandlerOptions<any>
}

export function createRouterProvider() {
    const router = createRouter()

    return {
        handler: router.handler,
        get: (
            path: string,
            handler: EventHandler<EventHandlerRequest, any>,
            opts?: IRouteHandleOptions
        ) => {
            if (opts?.cache) {
                router.get(
                    path,
                    defineCachedEventHandler(handler, opts.cacheOptions)
                )
            }
            router.get(path, defineEventHandler(handler))
        },
        post: (
            path: string,
            handler: EventHandler<EventHandlerRequest, any>,
            opts?: IRouteHandleOptions
        ) => {
            if (opts?.cache) {
                router.post(
                    path,
                    defineCachedEventHandler(handler, opts.cacheOptions)
                )
            }
            router.post(path, defineEventHandler(handler))
        },
        put: (
            path: string,
            handler: EventHandler<EventHandlerRequest, any>,
            opts?: IRouteHandleOptions
        ) => {
            if (opts?.cache) {
                router.put(
                    path,
                    defineCachedEventHandler(handler, opts.cacheOptions)
                )
            }
            router.put(path, defineEventHandler(handler))
        },
        delete: (
            path: string,
            handler: EventHandler<EventHandlerRequest, any>,
            opts?: IRouteHandleOptions
        ) => {
            if (opts?.cache) {
                router.delete(
                    path,
                    defineCachedEventHandler(handler, opts.cacheOptions)
                )
            }
            router.delete(path, defineEventHandler(handler))
        },
    }
}
