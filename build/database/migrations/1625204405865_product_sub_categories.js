"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ProductSubCategories extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'product_sub_categories';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 250).notNullable().unique();
            table.boolean('status');
            table.integer('product_category_id');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ProductSubCategories;
//# sourceMappingURL=1625204405865_product_sub_categories.js.map