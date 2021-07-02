/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return 'App working'
})

Route.post('/users/signup', 'UsersController.signup')
Route.post('/users/signin', 'UsersController.signin')

Route.resource('/products', 'ProductsController')
  .middleware({
    '*': ['auth'],
  })
  .apiOnly()

Route.resource('/product-categories', 'ProductCategoriesController')
  .middleware({
    '*': ['auth'],
  })
  .apiOnly()
Route.resource('/product-subcategories', 'ProductSubCategoriesController')
  .middleware({
    '*': ['auth'],
  })
  .apiOnly()
Route.any('*', async ({ request, response, params }) => {
  response.status(404)
  return { error: 'Not Found' }
})
