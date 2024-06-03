import { prisma } from '~/lib/prisma'
import { type MediaObject } from '~/domain/media'
import { EventHandlerRequest, H3Event } from 'h3'
import { ICriteriaProvider } from '~/server/application/providers/criteria'

export function TvSerieRepository(event: H3Event<EventHandlerRequest>) {
    const { id: CollectionId } = event.context.params as {
        id: string
        mediaId: string
    }

    return {
        async create(tvSerie: Omit<MediaObject, 'id'>) {
            return prisma.tVSeries.create({
                data: {
                    title: tvSerie.title,
                    description: tvSerie.description ?? 'Unknown',
                    releaseDate:
                        tvSerie.releaseDate ?? new Date().toISOString(),
                    rating: tvSerie.rating ?? 0,
                    genre: tvSerie.genre ?? 'Unknown',
                    director: tvSerie.director ?? 'Unknown',
                    actors: tvSerie.actors ?? [],
                    poster: tvSerie.poster ?? 'Unknown',
                    trailer: tvSerie.trailer ?? 'Unknown',
                    createdAt: tvSerie.createdAt ?? new Date(),
                    updatedAt: tvSerie.updatedAt ?? new Date(),
                    externalId: tvSerie.externalId,
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
        async update(tvSerie: Partial<MediaObject> & { id: string }) {
            return prisma.tVSeries.update({
                where: {
                    id: tvSerie.id,
                },
                data: {
                    title: tvSerie.title,
                    description: tvSerie.description,
                    releaseDate: tvSerie.releaseDate ?? undefined,
                    rating: tvSerie.rating,
                    genre: tvSerie.genre,
                    director: tvSerie.director,
                    actors: tvSerie.actors,
                    poster: tvSerie.poster,
                    trailer: tvSerie.trailer,
                    createdAt: tvSerie.createdAt ?? new Date(),
                    updatedAt: tvSerie.updatedAt ?? new Date(),
                },
            })
        },
        async delete(tvSerie: Pick<MediaObject, 'id'>) {
            return prisma.tVSeries.delete({
                where: {
                    id: tvSerie.id,
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
                return prisma.tVSeries.findFirst({
                    ...prismaCriteria,
                    where: {
                        AND: prismaCriteria.where.AND.map((whereTvSerie) => ({
                            ...whereTvSerie,
                            actors: { hasSome: whereTvSerie.actors },
                        })),
                        OR: prismaCriteria.where.OR.map((whereTvSerie) => ({
                            ...whereTvSerie,
                            actors: { hasSome: whereTvSerie.actors },
                        })),
                    },
                    orderBy: { ...prismaCriteria.orderBy, user: undefined },
                })
            }

            return prisma.tVSeries.findMany({
                where: {
                    AND: prismaCriteria.where.AND.map((whereTvSerie) => ({
                        ...whereTvSerie,
                        actors: { hasSome: whereTvSerie.actors },
                    })),
                    OR: prismaCriteria.where.OR.map((whereTvSerie) => ({
                        ...whereTvSerie,
                        actors: { hasSome: whereTvSerie.actors },
                    })),
                },
                orderBy: { ...prismaCriteria.orderBy, user: undefined },
            })
        },
    }
}
