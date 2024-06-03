import { array, type InferType, number, object, string } from 'yup'
import { validate } from '~/server/application/services/validate'

export type MediaObject = InferType<typeof mediaObject> & {
    user?: { id: string }
    collection?: { id: string }
}

export const mediaObject = object({
    id: string().required(),
    title: string().required(),
    description: string().required(),
    releaseDate: string(),
    rating: number(),
    genre: string(),
    director: string(),
    actors: array(string().required()),
    poster: string(),
    trailer: string(),
    createdAt: string(),
    updatedAt: string(),
    media_type: string(),
    externalId: string().required(),
})

export async function validateMedia(
    data: any,
    action: 'add' | 'update' | 'delete'
): Promise<
    Omit<MediaObject, 'id'> | Partial<MediaObject> | Pick<MediaObject, 'id'>
> {
    if (action === 'add')
        return (await validate(mediaObject.omit(['id']), data)) as Omit<
            MediaObject,
            'id'
        >
    else if (action === 'update')
        return (await validate(
            mediaObject.partial(),
            data
        )) as Partial<MediaObject>
    else if (action === 'delete')
        return (await validate(mediaObject.pick(['id']), data)) as Pick<
            MediaObject,
            'id'
        >
    else throw new Error('Invalid action')
}
