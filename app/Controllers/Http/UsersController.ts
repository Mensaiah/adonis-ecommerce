import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import User from '../../Models/User'
export default class UsersController {
  public async signup({ request, response, auth }: HttpContextContract) {
    const newUserSchema = schema.create({
      username: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string(),
      first_name: schema.string(),
      last_name: schema.string(),
      gender: schema.enum(['Male', 'Female'] as const),
      type: schema.string.optional(),
      contact_number: schema.string(),
      address: schema.string(),
    })

    const payload = await request.validate({ schema: newUserSchema })
    const existingEmail = await User.findBy('email', payload.email)
    if (existingEmail) {
      response.status(422)
      return {
        error: 'User with email already exists',
      }
    }

    payload.type = 'Admin'
    const user = await User.create(payload)
    response.status(201)
    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '7days',
    })

    return { data: { ...user.toJSON(), token } }
  }

  public async signin({ auth, request, response }: HttpContextContract) {
    const signinSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string(),
    })

    const payload = await request.validate({ schema: signinSchema })
    const user = await User.findBy('email', payload.email)

    // check for user
    if (!user) {
      response.status(400)
      return {
        error: 'Invalid Credentials',
      }
    }

    // check for password
    if (!(await Hash.verify(user.password, payload.password))) {
      response.status(400)
      return {
        error: 'Invalid Credentials',
      }
    }
    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '7days',
    })

    return { data: { ...user.toJSON(), token } }
  }
}
