import type { HttpContext } from '@adonisjs/core/http'
import Enrollement from '#models/enrollement'

export default class EnrollementsController {
  async index({}: HttpContext) {
    const enrollements = await Enrollement.query()
    return enrollements
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['user_id', 'event_id', 'date'])
    console.log(data)
    
    const enrollement = await Enrollement.create(data)
    return response.created(enrollement)
  }

  async show({ params, response }: HttpContext) {
    try {
      const enrollement = await Enrollement.findOrFail(params.id)
      return enrollement
    } catch (error) {
      return response.notFound({ message: 'Enrollement not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const enrollement = await Enrollement.findOrFail(params.id)
      const data = request.only(['user_id', 'event_id', 'date'])
      enrollement.merge(data)
      await enrollement.save()
      return enrollement
    } catch (error) {
      return response.notFound({ message: 'Enrollement not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const enrollement = await Enrollement.findOrFail(params.id)
      await enrollement.delete()
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Enrollement not found' })
    }
  }

  async userEnrollements({ params, response }: HttpContext) {
    try {
      const userId = params.userId
      const enrollements = await Enrollement.query()
        .where('user_id', userId)
        .preload('event')
      return enrollements
    } catch (error) {
      return response.notFound({ message: 'User enrollements not found' })
    }
  }
}
