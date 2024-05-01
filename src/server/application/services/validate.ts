import { ObjectSchema, AnyObject, Maybe } from 'yup'

export async function validate<T>(
    schema: ObjectSchema<T & Maybe<AnyObject>, AnyObject, Partial<T>, ''>,
    data: any
) {
    return await schema.validate(data)
}
