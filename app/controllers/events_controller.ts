import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'
import User from '#models/user'
import { createEventValidator } from '#validators/create_event'
import { updateEventValidator } from '#validators/update_event'

export default class EventsController {
  async index({ request, response }: HttpContext) {
    try {
      const userId = request.qs().userId;
  
      let eventsQuery = Event.query().preload('enrollements').orderBy('date', 'asc');
  
      if (userId) {
        eventsQuery = eventsQuery.where('user_id', userId);
      }
  
      const events = await eventsQuery;
      return events;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return response.status(500).json({
        error: 'Failed to fetch events',
        details: error.message,
      });
    }
  }
  

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createEventValidator)

      const user = await User.find(payload.userId)
      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }

      const event = await Event.create({
        ...payload,
        userId: user.id,
      })

      return event
    } catch (error) {
      console.error(error)
      return response.status(400).json({
        error: 'Validation failed',
        details: error.messages || error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const event = await Event.findByOrFail('id', params.id)
      await event.load('enrollements')
      return event
    } catch (error) {
      return response.status(404).json({ error: 'Event not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const event = await Event.findByOrFail('id', params.id)
      const payload = await request.validateUsing(updateEventValidator)

      event.merge(payload)
      await event.save()

      return event
    } catch (error) {
      return response.status(400).json({
        error: 'Event not found or validation failed',
        details: error.messages || error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const event = await Event.findByOrFail('id', params.id)
      await event.delete()
      return response.status(203).json({ message: 'Event deleted successfully' })
    } catch (error) {
      return response.status(404).json({ error: 'Event not found' })
    }
  }

  
}
