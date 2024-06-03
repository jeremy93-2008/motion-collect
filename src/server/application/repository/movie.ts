import { prisma } from '~/lib/prisma'
import { type MediaObject } from '~/domain/media'
import { EventHandlerRequest, H3Event } from 'h3'
import { ICriteriaProvider } from '~/server/application/providers/criteria'

export function MovieRepository(event: H3Event<EventHandlerRequest>) {
    const { id: CollectionId } = event.context.params as {
        id: string
        mediaId: string
    }

    return {
        async create(movie: Omit<MediaObject, 'id'>) {
            return prisma.movies.create({
                data: {
                    title: movie.title,
                    description: movie.description ?? 'Unknown',
                    releaseDate: movie.releaseDate ?? new Date().toISOString(),
                    rating: movie.rating ?? 0,
                    genre: movie.genre ?? 'Unknown',
                    director: movie.director ?? 'Unknown',
                    actors: movie.actors,
                    poster: movie.poster ?? 'Unknown',
                    trailer: movie.trailer ?? 'Unknown',
                    createdAt: movie.createdAt ?? new Date(),
                    updatedAt: movie.updatedAt ?? new Date(),
                    externalId: movie.externalId,
                    Collection: {
                        connect: {
                            id: CollectionId,
                        },
                    },
                    user: {
                        connect: {
                            id: event.context.user.id,
                        },
                    },
                },
            })
        },
        async update(movie: Partial<MediaObject> & { id: string }) {
            return prisma.movies.update({
                where: {
                    id: movie.id,
                },
                data: {
                    title: movie.title,
                    description: movie.description,
                    releaseDate: movie.releaseDate ?? undefined,
                    rating: movie.rating,
                    genre: movie.genre,
                    director: movie.director,
                    actors: movie.actors,
                    poster: movie.poster,
                    trailer: movie.trailer,
                    createdAt: movie.createdAt ?? new Date(),
                    updatedAt: movie.updatedAt ?? new Date(),
                },
            })
        },
        async delete(movie: Pick<MediaObject, 'id'>) {
            return prisma.movies.delete({
                where: {
                    id: movie.id,
                    user: {
                        id: event.context.user.id,
                    },
                    Collection: {
                        id: CollectionId,
                    },
                },
            })
        },
        async findByCriteria(criteria: ICriteriaProvider<MediaObject>) {
            const type = criteria.getCriteria().type
            const prismaCriteria = criteria.getPrismaCriteria()

            if (type === 'first') {
                return prisma.movies.findFirst({
                    ...prismaCriteria,
                    where: {
                        AND: prismaCriteria.where.AND.map((whereMovie) => ({
                            ...whereMovie,
                            actors: { hasSome: whereMovie.actors },
                        })),
                        OR: prismaCriteria.where.OR.map((whereMovie) => ({
                            ...whereMovie,
                            actors: { hasSome: whereMovie.actors },
                        })),
                    },
                    orderBy: { ...prismaCriteria.orderBy, user: undefined },
                })
            }

            return prisma.movies.findMany({
                ...prismaCriteria,
                where: {
                    AND: prismaCriteria.where.AND.map((whereMovie) => ({
                        ...whereMovie,
                        actors: { hasSome: whereMovie.actors },
                    })),
                    OR: prismaCriteria.where.OR.map((whereMovie) => ({
                        ...whereMovie,
                        actors: { hasSome: whereMovie.actors },
                    })),
                },
                orderBy: { ...prismaCriteria.orderBy, user: undefined },
            })
        },
    }
}
