import { EventHandlerRequest, H3Event } from 'h3'
import {
    type CollectionObject,
    CollectionObjectWithIncludes,
    validateCollection,
} from '~/domain/collection'
import { Visibility } from '~/types/collections.type'
import { CollectionRepository } from '~/server/application/repository/collection'
import { CriteriaProvider } from '~/server/application/providers/criteria'

async function getCollection(event: H3Event<EventHandlerRequest>) {
    const { id } = event.context.params as { id: string }

    const criteria = CriteriaProvider<CollectionObjectWithIncludes>()
        .type('first')
        .include(['user', 'Movies', 'TVSeries'])
        .or({
            id,
            user: {
                id: event.context.user.id,
            },
        })
        .or({ id, visibility: Visibility.Public })
        .or({ id, visibility: Visibility.Unlisted })

    const singleCollection =
        await CollectionRepository(event).findByCriteria(criteria)

    if (!singleCollection) {
        throw createError({
            statusCode: 404,
            message: 'Collection not found',
        })
    }

    return singleCollection
}

async function addCollection(event: H3Event<EventHandlerRequest>) {
    const body = (await validateCollection(
        await readBody(event),
        'add'
    )) as Omit<CollectionObject, 'id'>

    await CollectionRepository(event).create({
        title: body.title,
        description: body.description,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        visibility: (body.visibility as Visibility) ?? Visibility.Private,
    })
}

async function updateCollection(event: H3Event<EventHandlerRequest>) {
    const body = (await validateCollection(
        await readBody(event),
        'update'
    )) as Partial<CollectionObjectWithIncludes>

    if (!body.id)
        throw createError({
            statusCode: 400,
            message: 'Collection ID is required',
        })

    const singleCollection = (await getCollection(
        event
    )) as CollectionObjectWithIncludes

    if (singleCollection.user.id !== event.context.user.id)
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        })

    await CollectionRepository(event).update({
        id: body.id,
        title: body.title,
        description: body.description,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        visibility: (body.visibility as Visibility) ?? Visibility.Private,
    })
}

async function deleteCollection(event: H3Event<EventHandlerRequest>) {
    const body = (await validateCollection(
        await readBody(event),
        'delete'
    )) as Pick<CollectionObjectWithIncludes, 'id'>

    await CollectionRepository(event).delete({ id: body.id })
}

export default {
    getCollection,
    addCollection,
    updateCollection,
    deleteCollection,
}
