import { EventHandlerRequest, H3Event } from 'h3'
import { type MediaObject, validateMedia } from '~/domain/media'
import { CriteriaProvider } from '~/server/application/providers/criteria'
import { MovieRepository } from '~/server/application/repository/movie'
import { TvSerieRepository } from '~/server/application/repository/tvserie'

async function getMedia(event: H3Event<EventHandlerRequest>) {
    const { id, movieType } = event.context.params as {
        id: string
        movieType: 'movie' | 'tv'
    }

    const criteria = CriteriaProvider<MediaObject>().type('first').and({
        id,
    })

    const singleMovie = await MovieRepository(event).findByCriteria(criteria)
    const singleTvSerie =
        await TvSerieRepository(event).findByCriteria(criteria)

    if (!singleMovie && !singleTvSerie) {
        throw createError({
            statusCode: 404,
            message: 'Collection not found',
        })
    }

    return singleMovie ?? singleTvSerie ?? undefined
}

async function addMedia(event: H3Event<EventHandlerRequest>) {
    const body = (await validateMedia(await readBody(event), 'add')) as Omit<
        MediaObject,
        'id'
    >

    const { id: CollectionId, movieType } = event.context.params as {
        id: string
        movieType: 'movie' | 'show'
    }

    if (!CollectionId) {
        throw createError({
            statusCode: 400,
            message: 'Collection ID is required',
        })
    }

    if (movieType === 'show')
        return TvSerieRepository(event).create({
            title: body.title,
            description: body.description,
            releaseDate: body.releaseDate ?? new Date().toISOString(),
            rating: body.rating ?? 0,
            genre: body.genre ?? 'Unknown',
            director: body.director ?? 'Unknown',
            actors: body.actors ?? [],
            poster: body.poster ?? 'Unknown',
            trailer: body.trailer ?? 'Unknown',
            createdAt: body.createdAt ?? new Date().toISOString(),
            updatedAt: body.updatedAt ?? new Date().toISOString(),
            externalId: body.externalId,
        })

    return MovieRepository(event).create({
        title: body.title,
        description: body.description,
        releaseDate: body.releaseDate ?? new Date().toISOString(),
        rating: body.rating ?? 0,
        genre: body.genre ?? 'Unknown',
        director: body.director ?? 'Unknown',
        actors: body.actors ?? [],
        poster: body.poster ?? 'Unknown',
        trailer: body.trailer ?? 'Unknown',
        createdAt: body.createdAt ?? new Date().toISOString(),
        updatedAt: body.updatedAt ?? new Date().toISOString(),
        externalId: body.externalId,
    })
}

async function updateMedia(event: H3Event<EventHandlerRequest>) {
    const body = (await validateMedia(
        await readBody(event),
        'update'
    )) as Partial<MediaObject>

    const { id: CollectionId, movieType } = event.context.params as {
        id: string
        movieType: 'movie' | 'tv'
    }

    if (!CollectionId) {
        throw createError({
            statusCode: 400,
            message: 'Collection ID is required',
        })
    }

    if (!body.id) {
        throw createError({
            statusCode: 400,
            message: 'Media ID is required',
        })
    }

    if (movieType === 'tv')
        return TvSerieRepository(event).update({
            id: body.id,
            title: body.title,
            description: body.description,
            releaseDate: body.releaseDate ?? new Date().toISOString(),
            rating: body.rating ?? 0,
            genre: body.genre ?? 'Unknown',
            director: body.director ?? 'Unknown',
            actors: body.actors ?? [],
            poster: body.poster ?? 'Unknown',
            trailer: body.trailer ?? 'Unknown',
            createdAt: body.createdAt ?? new Date().toISOString(),
            updatedAt: body.updatedAt ?? new Date().toISOString(),
        })

    return MovieRepository(event).update({
        id: body.id,
        title: body.title,
        description: body.description,
        releaseDate: body.releaseDate ?? new Date().toISOString(),
        rating: body.rating ?? 0,
        genre: body.genre ?? 'Unknown',
        director: body.director ?? 'Unknown',
        actors: body.actors ?? [],
        poster: body.poster ?? 'Unknown',
        trailer: body.trailer ?? 'Unknown',
        createdAt: body.createdAt ?? new Date().toISOString(),
        updatedAt: body.updatedAt ?? new Date().toISOString(),
    })
}

async function deleteMedia(event: H3Event<EventHandlerRequest>) {
    const body = (await validateMedia(await readBody(event), 'delete')) as Pick<
        MediaObject,
        'id'
    >

    const { movieType } = event.context.params as {
        id: string
        movieType: 'movie' | 'tv'
    }

    if (!body.id) {
        throw createError({
            statusCode: 400,
            message: 'Media ID is required',
        })
    }

    if (movieType === 'tv')
        return TvSerieRepository(event).delete({
            id: body.id,
        })

    return MovieRepository(event).delete({
        id: body.id,
    })
}

export default {
    getMedia,
    addMedia,
    updateMedia,
    deleteMedia,
}
