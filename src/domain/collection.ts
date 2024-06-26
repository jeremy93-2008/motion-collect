import { type InferType, mixed, object, string } from 'yup'
import { Visibility } from '~/types/collections.type'
import { validate } from '~/server/application/services/validate'
import type { MediaObject } from '~/domain/media'

export type CollectionObjectWithIncludes = CollectionObject & {
    Movies: MediaObject[]
    TVSeries: MediaObject[]
    user: { id: string }
}

export type CollectionObject = InferType<typeof collectionObject>

export const collectionObject = object({
    id: string().required(),
    title: string().required(),
    description: string(),
    createdAt: string(),
    updatedAt: string(),
    visibility: mixed().oneOf(Object.values(Visibility)),
})

export async function validateCollection(
    data: any,
    action: 'add' | 'update' | 'delete'
): Promise<
    | Omit<CollectionObject, 'id'>
    | Partial<CollectionObject>
    | Pick<CollectionObject, 'id'>
> {
    if (action === 'add')
        return (await validate(collectionObject.omit(['id']), data)) as Omit<
            CollectionObject,
            'id'
        >
    else if (action === 'update')
        return (await validate(
            collectionObject.partial(),
            data
        )) as Partial<CollectionObject>
    else if (action === 'delete')
        return (await validate(collectionObject.pick(['id']), data)) as Pick<
            CollectionObject,
            'id'
        >
    else throw new Error('Invalid action')
}
