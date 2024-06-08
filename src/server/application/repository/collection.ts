import { prisma } from '~/lib/prisma'
import { type CollectionObject } from '~/domain/collection'
import { EventHandlerRequest, H3Event } from 'h3'
import { Visibility } from '~/types/collections.type'
import { ICriteriaProvider } from '~/server/application/providers/criteria'

export function CollectionRepository(event: H3Event<EventHandlerRequest>) {
    return {
        async create(collection: Omit<CollectionObject, 'id'>) {
            return prisma.collection.create({
                data: {
                    title: collection.title,
                    description: collection.description ?? 'Unknown',
                    createdAt: collection.createdAt ?? new Date(),
                    updatedAt: collection.updatedAt ?? new Date(),
                    visibility:
                        (collection.visibility as Visibility) ??
                        Visibility.Private,
                    user: {
                        connect: {
                            id: event.context.user.id,
                        },
                    },
                },
            })
        },
        async update(collection: Partial<CollectionObject> & { id: string }) {
            return prisma.collection.update({
                where: {
                    id: collection.id,
                },
                data: {
                    title: collection.title ?? undefined,
                    description: collection.description ?? undefined,
                    updatedAt: collection.updatedAt ?? undefined,
                    visibility: collection.visibility ?? undefined,
                },
            })
        },
        async delete(collection: Pick<CollectionObject, 'id'>) {
            return prisma.collection.delete({
                where: {
                    id: collection.id,
                    user: {
                        id: event.context.user.id,
                    },
                },
            })
        },
        async findByCriteria(criteria: ICriteriaProvider<CollectionObject>) {
            const type = criteria.getCriteria().type
            const prismaCriteria = criteria.getPrismaCriteria()

            if (type === 'first') {
                return prisma.collection.findFirst({
                    ...prismaCriteria,
                    orderBy: { ...prismaCriteria.orderBy, user: undefined },
                })
            }

            return prisma.collection.findMany({
                ...prismaCriteria,
                orderBy: { ...prismaCriteria.orderBy, user: undefined },
            })
        },
    }
}
