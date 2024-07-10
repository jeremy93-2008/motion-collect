import { EventHandlerRequest, H3Event } from 'h3'
import type { IMovieDB } from '~/types/MovieDB.type'
import CollectionsController from './collections'
import CacheProvider from '~/server/application/services/cache'
import { CollectionObjectWithIncludes } from '~/domain/collection'

async function Search(event: H3Event<EventHandlerRequest>) {
    const searchTerm = getQuery(event).q as string
    const filterTerm = getQuery(event).filter as
        | 'all'
        | 'movie'
        | 'tv'
        | 'collection'
    const page = getQuery(event).page as number

    if (!searchTerm)
        throw createError({
            status: 400,
            message: 'No search term provided',
        })

    let collections = [] as CollectionObjectWithIncludes[]

    if (filterTerm === 'collection' || filterTerm === 'all') {
        collections = (
            (await CollectionsController.getCollections(
                event
            )) as unknown as CollectionObjectWithIncludes[]
        )
            .filter((collection) =>
                collection.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            )
            .map((collection) => ({
                ...collection,
                media_type: 'collection',
            }))

        if (filterTerm === 'collection')
            return {
                results: collections,
                page: 1,
                total_pages: 1,
                total_results: collections.length,
            }
    }

    const endpointKey = filterTerm === 'all' ? 'multi' : filterTerm

    const fetchedData = await $fetch<IMovieDB>(
        `https://api.themoviedb.org/3/search/${endpointKey}?query=${searchTerm}`,
        {
            headers: {
                Authorization:
                    'Bearer ' + useRuntimeConfig(event).public.moviedbApiKey,
            },
            query: {
                sort_by: 'popularity.desc',
                page: page ?? 1,
            },
        }
    )

    return {
        page: fetchedData.page,
        results: [
            ...(!page || page == 1
                ? collections.map((collection) => ({
                      ...collection,
                      media_type: 'collection',
                  }))
                : []),
            ...fetchedData.results.filter(
                (entry) =>
                    entry.media_type !== 'person' &&
                    entry.media_type != 'collection'
            ),
        ],
        total_results: fetchedData.total_results,
        total_pages: fetchedData.total_pages,
    }
}

function getCacheOptions() {
    return CacheProvider.getCacheOptions('api/search', 'search')
}

export default {
    search: Search,
    getCacheOptions,
}
