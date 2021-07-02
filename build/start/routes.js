"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return 'App working';
});
Route_1.default.post('/users/signup', 'UsersController.signup');
Route_1.default.post('/users/signin', 'UsersController.signin');
Route_1.default.resource('/products', 'ProductsController')
    .middleware({
    '*': ['auth'],
})
    .apiOnly();
Route_1.default.resource('/product-categories', 'ProductCategoriesController')
    .middleware({
    '*': ['auth'],
})
    .apiOnly();
Route_1.default.resource('/product-subcategories', 'ProductSubCategoriesController')
    .middleware({
    '*': ['auth'],
})
    .apiOnly();
Route_1.default.any('*', async ({ response }) => {
    response.status(404);
    return { error: 'Not Found' };
});
//# sourceMappingURL=routes.js.map