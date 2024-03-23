import { EventHandlerRequest, H3Event } from 'h3'
import type { IMovieDB } from '~/types/MovieDB.type'

export default defineCachedEventHandler(
    async (event) => {
        const searchTerm = getQuery(event).q as string

        if (!searchTerm)
            throw createError({
                status: 400,
                message: 'No search term provided',
            })

        const fetchedData = await $fetch<IMovieDB>(
            `https://api.themoviedb.org/3/search/multi?query=${searchTerm}`,
            {
                headers: {
                    Authorization:
                        'Bearer ' +
                        useRuntimeConfig(event).public.moviedbApiKey,
                },
                query: {
                    sort_by: 'popularity.desc',
                    page: 1,
                },
            }
        )

        return fetchedData.results.filter(
            (entry) => entry.media_type !== 'person'
        )
    },
    {
        maxAge: 60 * 60,
        name: 'api/search',
        getKey: (event: H3Event<EventHandlerRequest>) =>
            getQuery(event).search as string,
    }
)
