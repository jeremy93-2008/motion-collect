import { useBase } from 'h3'
import { createRouterProvider } from '~/server/application/providers/router'
import SearchController from '~/server/application/controllers/search'
import CollectionsController from '~/server/application/controllers/collections'
import CollectionController from '~/server/application/controllers/collection'
import MediaController from '~/server/application/controllers/media'

const routerProvider = createRouterProvider()

routerProvider.get('/health', (event) => 'OK')

routerProvider.get('/collections', CollectionsController.getCollections)
routerProvider.get('/collection/:id', CollectionController.getCollection)

routerProvider.post('/collection/create', CollectionController.addCollection)
routerProvider.post('/collection/update', CollectionController.updateCollection)
routerProvider.post('/collection/delete', CollectionController.deleteCollection)

routerProvider.post('/collection/:id/:movieType/add', MediaController.addMedia)
routerProvider.post(
    '/collection/:id/:movieType/edit',
    MediaController.updateMedia
)
routerProvider.post(
    '/collection/:id/:movieType/delete',
    MediaController.deleteMedia
)

routerProvider.get('/search', SearchController.search, {
    cache: true,
    cacheOptions: SearchController.getCacheOptions(),
})

export default useBase('/api', routerProvider.handler)
