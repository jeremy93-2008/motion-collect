import { useBase } from 'h3'
import { createRouterProvider } from '~/server/application/providers/router'
import SearchController from '~/server/application/controllers/search'
import CollectionsController from '~/server/application/controllers/collections'
import CollectionController from '~/server/application/controllers/collection'

const routerProvider = createRouterProvider()

routerProvider.get('/health', (event) => 'OK')

routerProvider.get('/collections', CollectionsController.getCollections)
routerProvider.get('/collection/:id', CollectionController.getCollection)

routerProvider.get('/search', SearchController.search, {
    cache: true,
    cacheOptions: SearchController.getCacheOptions(),
})

export default useBase('/api', routerProvider.handler)
