"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../Models/Product"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ProductsController {
    async index() {
        return { data: await Product_1.default.all() };
    }
    async store({ request, response, auth }) {
        const user = await auth.authenticate();
        const newUserSchema = Validator_1.schema.create({
            title: Validator_1.schema.string(),
            user_id: Validator_1.schema.number.optional(),
            description: Validator_1.schema.string(),
            price: Validator_1.schema.number(),
            product_category_id: Validator_1.schema.number(),
            product_sub_category_id: Validator_1.schema.number(),
        });
        const payload = await request.validate({ schema: newUserSchema });
        payload.user_id = user.id;
        const existingName = await Product_1.default.findBy('title', payload.title);
        if (existingName) {
            response.status(422);
            return {
                error: 'A product with that title already exists',
            };
        }
        const product = await Product_1.default.create(payload);
        response.status(201);
        return { data: product };
    }
    async show({ params, response }) {
        const product = await Product_1.default.find(params.id);
        if (!product) {
            response.status(404);
            return {
                error: 'Product  not found',
            };
        }
        return { data: product };
    }
    async update({ params, request, response }) {
        const newUserSchema = Validator_1.schema.create({
            title: Validator_1.schema.string.optional(),
            description: Validator_1.schema.string.optional(),
            price: Validator_1.schema.number.optional(),
            product_category_id: Validator_1.schema.number.optional(),
            product_sub_category_id: Validator_1.schema.number.optional(),
        });
        const payload = await request.validate({ schema: newUserSchema });
        const product = await Product_1.default.find(params.id);
        if (!product) {
            response.status(404);
            return {
                error: 'Product not found',
            };
        }
        product.title = payload.title || product.title;
        product.description = payload.description || product.description;
        product.price = payload.price || product.price;
        product.product_category_id = payload.product_category_id || product.product_category_id;
        product.product_sub_category_id =
            payload.product_sub_category_id || product.product_sub_category_id;
        return product.save();
    }
    async destroy({ params, response }) {
        const product = await Product_1.default.find(params.id);
        if (!product) {
            response.status(404);
            return {
                error: 'Product not found',
            };
        }
        await product.delete();
        return { message: 'Deleted successfully' };
    }
}
exports.default = ProductsController;
//# sourceMappingURL=ProductsController.js.map