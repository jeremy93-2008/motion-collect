import { EventHandlerRequest, H3Event } from 'h3'
import { type CollectionObject, validateCollection } from '~/domain/collection'
import { Visibility } from '~/types/collections.type'
import { CollectionRepository } from '~/server/application/repository/collection'
import { CriteriaProvider } from '~/server/application/providers/criteria'

async function getCollection(event: H3Event<EventHandlerRequest>) {
    const { id } = event.context.params as { id: string }

    const criteria = CriteriaProvider<CollectionObject>()
        .type('first')
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
    )) as Partial<CollectionObject>

    if (!body.id)
        throw createError({
            statusCode: 400,
            message: 'Collection ID is required',
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
    )) as Pick<CollectionObject, 'id'>

    await CollectionRepository(event).delete({ id: body.id })
}

export default {
    getCollection,
    addCollection,
    updateCollection,
    deleteCollection,
}
