// Parallels Route Module for NuxtJS
// (every page that begin with ":" will be a parallel route,
// and will be rendered in parallel with the main route)

import { defineNuxtModule, extendPages } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'

export default defineNuxtModule({
    meta: {
        name: 'parallelsRoute',
    },
    setup(options) {
        extendPages((pages) => {
            const parallelPages = pages
                .filter((page) => page.file!.includes('@'))
                .map((page) => {
                    return {
                        ...page,
                        name: page.name!.replace(/@/gi, ''),
                        path: page
                            .path!.replace(/@/gi, '')
                            .replaceAll('\\', ''),
                    }
                })
            // Remove all pages that begin with "@", they will be rendered in parallel in all
            // other top-level route pages
            removePagesMatching(/@/gi, pages)

            // Add the parallel pages as nested children of all other top-level route pages
            for (const page of pages) {
                page.children = page.children || []
                for (const parallelPage of parallelPages) {
                    page.children.push({
                        ...parallelPage,
                        name: page.name! + '-' + parallelPage.name!,
                        path: (page.path! + parallelPage.path!).replaceAll(
                            '//',
                            '/'
                        ),
                    })
                }
            }
        })
    },
})

function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
    const pagesToRemove = []
    for (const page of pages) {
        if (pattern.test(page.file!)) {
            pagesToRemove.push(page)
        } else {
            removePagesMatching(pattern, page.children)
        }
    }
    for (const page of pagesToRemove) {
        pages.splice(pages.indexOf(page), 1)
    }
}
