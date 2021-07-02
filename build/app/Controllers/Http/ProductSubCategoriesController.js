"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductSubCategory_1 = __importDefault(require("../../Models/ProductSubCategory"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ProductSubCategoriesController {
    async index() {
        return { data: await ProductSubCategory_1.default.all() };
    }
    async store({ request, response }) {
        const newUserSchema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }),
            product_category_id: Validator_1.schema.number(),
            status: Validator_1.schema.boolean.optional(),
        });
        const payload = await request.validate({ schema: newUserSchema });
        payload.status = true;
        const existingName = await ProductSubCategory_1.default.findBy('name', payload.name);
        if (existingName) {
            response.status(422);
            return {
                error: 'A category with that name already exists',
            };
        }
        const category = await ProductSubCategory_1.default.create(payload);
        response.status(201);
        return { data: category };
    }
    async show({ params, response }) {
        const category = await ProductSubCategory_1.default.find(params.id);
        if (!category) {
            response.status(404);
            return {
                error: 'Product  SubCategory not found',
            };
        }
        return { data: category };
    }
    async update({ params, request, response }) {
        const newUserSchema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }),
            status: Validator_1.schema.boolean.optional(),
        });
        const payload = await request.validate({ schema: newUserSchema });
        const category = await ProductSubCategory_1.default.find(params.id);
        if (!category) {
            response.status(404);
            return {
                error: 'Product  SubCategory not found',
            };
        }
        category.name = payload.name || category.name;
        category.status = payload.status || category.status;
        return category.save();
    }
    async destroy({ params, response }) {
        const category = await ProductSubCategory_1.default.find(params.id);
        if (!category) {
            response.status(404);
            return {
                error: 'Product  SubCategory not found',
            };
        }
        await category.delete();
        return { message: 'Deleted successfully' };
    }
}
exports.default = ProductSubCategoriesController;
//# sourceMappingURL=ProductSubCategoriesController.js.map