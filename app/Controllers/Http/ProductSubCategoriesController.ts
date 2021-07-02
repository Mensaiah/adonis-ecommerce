import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductSubCategory from '../../Models/ProductSubCategory'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProductSubCategoriesController {
  public async index() {
    return { data: await ProductSubCategory.all() }
  }

  public async store({ request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({ trim: true }),
      product_category_id: schema.number(),
      status: schema.boolean.optional(),
    })
    const payload = await request.validate({ schema: newUserSchema })
    payload.status = true

    const existingName = await ProductSubCategory.findBy('name', payload.name)
    if (existingName) {
      response.status(422)
      return {
        error: 'A category with that name already exists',
      }
    }

    const category = await ProductSubCategory.create(payload)
    response.status(201)
    return { data: category }
  }

  public async show({ params, response }: HttpContextContract) {
    const category = await ProductSubCategory.find(params.id)
    if (!category) {
      response.status(404)
      return {
        error: 'Product  SubCategory not found',
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

    const category = await ProductSubCategory.find(params.id)
    if (!category) {
      response.status(404)
      return {
        error: 'Product  SubCategory not found',
      }
    }
    category.name = payload.name || category.name
    category.status = payload.status || category.status
    return category.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const category = await ProductSubCategory.find(params.id)
    if (!category) {
      response.status(404)
      return {
        error: 'Product  SubCategory not found',
      }
    }
    await category.delete()

    return { message: 'Deleted successfully' }
  }
}
