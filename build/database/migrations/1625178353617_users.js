"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Users extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('username', 225);
            table.string('email', 225).notNullable().unique();
            table.string('password', 180);
            table.string('remember_me_token', 225);
            table.enum('type', ['admin']);
            table.string('first_name', 225);
            table.string('last_name', 225);
            table.string('gender', 225);
            table.string('contact_number', 225);
            table.string('address', 225);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Users;
//# sourceMappingURL=1625178353617_users.js.map