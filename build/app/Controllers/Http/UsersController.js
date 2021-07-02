"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(require("../../Models/User"));
class UsersController {
    async signup({ request, response, auth }) {
        const newUserSchema = Validator_1.schema.create({
            username: Validator_1.schema.string({ trim: true }),
            email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
            password: Validator_1.schema.string(),
            first_name: Validator_1.schema.string(),
            last_name: Validator_1.schema.string(),
            gender: Validator_1.schema.enum(['Male', 'Female']),
            type: Validator_1.schema.string.optional(),
            contact_number: Validator_1.schema.string(),
            address: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: newUserSchema });
        const existingEmail = await User_1.default.findBy('email', payload.email);
        if (existingEmail) {
            response.status(422);
            return {
                error: 'User with email already exists',
            };
        }
        payload.type = 'Admin';
        const user = await User_1.default.create(payload);
        response.status(201);
        const token = await auth.use('api').generate(user, {
            expiresIn: '7days',
        });
        return { data: { ...user.toJSON(), token } };
    }
    async signin({ auth, request, response }) {
        const signinSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
            password: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: signinSchema });
        const user = await User_1.default.findBy('email', payload.email);
        if (!user) {
            response.status(400);
            return {
                error: 'Invalid Credentials',
            };
        }
        if (!(await Hash_1.default.verify(user.password, payload.password))) {
            response.status(400);
            return {
                error: 'Invalid Credentials',
            };
        }
        const token = await auth.use('api').generate(user, {
            expiresIn: '7days',
        });
        return { data: { ...user.toJSON(), token } };
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map