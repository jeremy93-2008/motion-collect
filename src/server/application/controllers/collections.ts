import { EventHandlerRequest, H3Event } from 'h3'
import { prisma } from '~/lib/prisma'
import { Visibility } from '~/types/collections.type'

async function getCollections(event: H3Event<EventHandlerRequest>) {
    const { visibility } = getQuery(event) as { visibility: Visibility }
    return prisma.collection.findMany({
        where:
            visibility === Visibility.Public
                ? {
                      OR: [
                          { visibility: Visibility.Public },
                          { visibility: Visibility.Unlisted },
                      ],
                  }
                : {
                      visibility: Visibility.Private,
                      user: {
                          id: event.context.user.id,
                      },
                  },
    })
}

export default {
    getCollections,
}
