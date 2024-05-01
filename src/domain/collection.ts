import { type InferType, mixed, object, string } from 'yup'
import { Visibility } from '~/types/collections.type'
import { validate } from '~/server/application/services/validate'

export type CollectionObject = InferType<typeof collectionObject> & {
    user?: { id: string }
}

export const collectionObject = object({
    id: string().required(),
    title: string().required(),
    description: string().required(),
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
