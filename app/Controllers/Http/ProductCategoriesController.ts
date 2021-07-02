import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from '../../Models/ProductCategory'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProductCategoriesController {
  public async index(ctx: HttpContextContract) {
    return { data: await ProductCategory.all() }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({ trim: true }),
      status: schema.boolean.optional(),
    })
    const payload = await request.validate({ schema: newUserSchema })
    payload.status = true

    const existingName = await ProductCategory.findBy('name', payload.name)
    if (existingName) {
      response.status(422)
      return {
        error: 'A category with that name already exists',
      }
    }

    const category = await ProductCategory.create(payload)
    response.status(201)
    return { data: category }
  }

  public async show({ params, response }: HttpContextContract) {
    const category = await ProductCategory.find(params.id)
    if (!category) {
      response.status(404)
      return {
        error: 'Product Category not found',
      }
    }

    return { data: category }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({ trim: true }),
      status: schema.boolean.optional(),
    })
    const payload = await request.validate({ schema: newUserSchema })

    const category = await ProductCategory.find(params.id)
    if (!category) {
      response.status(404)
      return {
        error: 'Product Category not found',
      }
    }
    category.name = payload.name || category.name
    category.status = payload.status || category.status
    return category.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const category = await ProductCategory.find(params.id)
    if (!category) {
      response.status(404)
      return {
        error: 'Product Category not found',
      }
    }

    await category.delete()
    return { message: 'Deleted successfully' }
  }
}
