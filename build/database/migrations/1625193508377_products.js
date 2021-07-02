"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Products extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'products';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('title', 250).notNullable().unique();
            table.string('description', 255);
            table.integer('price');
            table.integer('user_id');
            table.integer('product_category_id');
            table.integer('product_sub_category_id');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Products;
//# sourceMappingURL=1625193508377_products.js.map