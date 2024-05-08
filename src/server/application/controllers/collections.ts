import { EventHandlerRequest, H3Event } from 'h3'
import { prisma } from '~/lib/prisma'
import { Visibility } from '~/types/collections.type'
import { CollectionRepository } from '~/server/application/repository/collection'
import { CriteriaProvider } from '~/server/application/providers/criteria'
import { CollectionObject } from '~/domain/collection'

async function getCollections(event: H3Event<EventHandlerRequest>) {
    const { visibility } = getQuery(event) as { visibility: Visibility }

    const criteriaForVisibleCollections = CriteriaProvider<CollectionObject>()
        .type('many')
        .include(['user', 'Movies', 'TVSeries'])
        .or({ visibility: Visibility.Public })
        .or({ visibility: Visibility.Unlisted })
        .or({
            user: {
                id: event.context.user.id,
            },
        })

    const criteriaForCurrentUserCollections =
        CriteriaProvider<CollectionObject>()
            .type('many')
            .include(['user', 'Movies', 'TVSeries'])
            .or({
                user: {
                    id: event.context.user.id,
                },
            })

    return CollectionRepository(event).findByCriteria(
        visibility === Visibility.Public
            ? criteriaForVisibleCollections
            : criteriaForCurrentUserCollections
    )
}

export default {
    getCollections,
}
