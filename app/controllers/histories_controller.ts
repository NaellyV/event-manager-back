import type { HttpContext } from '@adonisjs/core/http'
import History from '#models/history'

export default class HistoriesController {
  async index({}: HttpContext) {
    const histories = await History.query()
    return histories
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['event_id', 'date'])

      const history = await History.create(data)
      return response.created({ message: 'History record created successfully', history })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to create history record',
        error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const history = await History.findOrFail(params.id)
      return history
    } catch {
      return response.notFound({ message: 'History record not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const history = await History.findOrFail(params.id)
      await history.delete()
      return response.ok({ message: 'History record deleted successfully' })
    } catch {
      return response.notFound({ message: 'History record not found' })
    }
  }
}
