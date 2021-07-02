import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProductsController {
  public async index() {
    return { data: await Product.all() }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()

    const newUserSchema = schema.create({
      title: schema.string(),

      user_id: schema.number.optional(),

      description: schema.string(),

      price: schema.number(),

      product_category_id: schema.number(),
      product_sub_category_id: schema.number(),
    })
    const payload = await request.validate({ schema: newUserSchema })

    payload.user_id = user.id

    const existingName = await Product.findBy('title', payload.title)
    if (existingName) {
      response.status(422)
      return {
        error: 'A product with that title already exists',
      }
    }

    const product = await Product.create(payload)
    response.status(201)
    return { data: product }
  }

  public async show({ params, response }: HttpContextContract) {
    const product = await Product.find(params.id)
    if (!product) {
      response.status(404)
      return {
        error: 'Product  not found',
      }
    }

    return { data: product }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      title: schema.string.optional(),

      description: schema.string.optional(),

      price: schema.number.optional(),

      product_category_id: schema.number.optional(),
      product_sub_category_id: schema.number.optional(),
    })
    const payload = await request.validate({ schema: newUserSchema })

    const product = await Product.find(params.id)
    if (!product) {
      response.status(404)
      return {
        error: 'Product not found',
      }
    }
    product.title = payload.title || product.title
    product.description = payload.description || product.description
    product.price = payload.price || product.price
    product.product_category_id = payload.product_category_id || product.product_category_id
    product.product_sub_category_id =
      payload.product_sub_category_id || product.product_sub_category_id

    return product.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const product = await Product.find(params.id)
    if (!product) {
      response.status(404)
      return {
        error: 'Product not found',
      }
    }
    await product.delete()

    return { message: 'Deleted successfully' }
  }
}
