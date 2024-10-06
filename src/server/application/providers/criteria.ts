export interface ICriteriaProvider<T> {
    type: (type: 'first' | 'many') => ICriteriaProvider<T>
    and: (object: Partial<T>) => ICriteriaProvider<T>
    or: (object: Partial<T>) => ICriteriaProvider<T>
    take: (take: number) => ICriteriaProvider<T>
    skip: (skip: number) => ICriteriaProvider<T>
    orderBy: (
        orderBy: Partial<Record<keyof T, 'asc' | 'desc'>>
    ) => ICriteriaProvider<T>
    include: (include: string[]) => ICriteriaProvider<T>
    getPrismaCriteria: () => IPrismaCriteria<T>
    getCriteria: () => ICriteria<T>
}

export interface ICriteriaWhere<T> {
    AND: Partial<T>[]
    OR: Partial<T>[]
    NOT?: Partial<T>[]
}

export interface IPrismaCriteria<T> {
    where: ICriteriaWhere<T>
    take?: number
    skip?: number
    orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>
    include?: Record<string, boolean>
}

export interface ICriteria<T> {
    where: ICriteriaWhere<T>
    type?: 'first' | 'many'
    take?: number
    skip?: number
    orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>
    include?: string[]
}

export function CriteriaProvider<T>(
    criteria: ICriteria<T> = {
        where: { AND: [], OR: [], NOT: [] },
        skip: 0,
        take: 10,
        type: 'many',
        orderBy: undefined,
    }
): ICriteriaProvider<T> {
    return {
        type: (type: 'first' | 'many') => {
            return CriteriaProvider<T>({ ...criteria, type })
        },
        and: (object: Partial<T>) => {
            const newCriteria = {
                ...criteria,
                where: {
                    ...criteria.where,
                    AND: [...criteria.where.AND, object],
                },
            }
            return CriteriaProvider<T>({ ...newCriteria })
        },
        or: (object: Partial<T>) => {
            const newCriteria = {
                ...criteria,
                where: {
                    ...criteria.where,
                    OR: [...criteria.where.OR, object],
                },
            }
            return CriteriaProvider<T>({ ...newCriteria })
        },
        not: (object: Partial<T>) => {
            const newCriteria = {
                ...criteria,
                where: {
                    ...criteria.where,
                    NOT: [...criteria.where.NOT, object],
                },
            }
            return CriteriaProvider<T>({ ...newCriteria })
        },
        take: (take: number) => {
            return CriteriaProvider<T>({ ...criteria, take })
        },
        skip: (skip: number) => {
            return CriteriaProvider<T>({ ...criteria, skip })
        },
        orderBy: (orderBy: Partial<Record<keyof T, 'asc' | 'desc'>>) => {
            return CriteriaProvider<T>({ ...criteria, orderBy })
        },
        include: (include: string[]) => {
            return CriteriaProvider<T>({ ...criteria, include })
        },
        getPrismaCriteria: () => {
            return {
                where: criteria.where,
                take: criteria.take,
                skip: criteria.skip,
                orderBy: criteria.orderBy,
                include: criteria.include
                    ? {
                          ...criteria.include.reduce(
                              (acc, field) => {
                                  acc[field] = true
                                  return acc
                              },
                              {} as Record<string, boolean>
                          ),
                      }
                    : undefined,
            }
        },
        getCriteria: () => {
            return criteria
        },
    }
}
