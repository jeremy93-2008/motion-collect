import { CachedEventHandlerOptions } from 'nitropack'
import { EventHandlerRequest, H3Event } from 'h3'

function getCacheOptions(name: string, id: string): CachedEventHandlerOptions {
  return {
      maxAge: 60 * 60,
      name,
      getKey: (event: H3Event<EventHandlerRequest>) =>
          getQuery(event)[id] as string,
  };
}

export default { getCacheOptions }