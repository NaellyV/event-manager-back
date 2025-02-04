import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import Hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async index({}: HttpContext) {
    const user = await User.query().preload('events')
    return user
  }

  async store({ request }: HttpContext) {
    const { name, email, password } = await request.validateUsing(createUserValidator)
    const user = await User.create({ name, email, password })
    return user
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.load('events')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  async update({ params, request }: HttpContext) {
    const user = await User.findBy('id', params.id)
    const { name, password } = await request.validateUsing(updateUserValidator)
    user!.merge({ name, password })
    await user!.save()
    return user
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  async register({ request, response }: HttpContext) {
    const { email, password, name } = request.only(['email', 'password', 'name'])
    console.log('Received data:', { email, password, name })

    if (!email || !password || !name) {
      console.error('Missing required fields:', { email, password, name })
      return response.badRequest({ message: 'Missing required fields' })
    }

    try {
      const userExists = await User.findBy('email', email)
      if (userExists) {
        return response.badRequest({ message: 'E-mail já está em uso.' })
      }

      const hashedPassword = await Hash.make(password)

      const user = await User.create({
        email,
        password: hashedPassword,
        name,
      })

      return response.created({ message: 'User registered successfully', user })
    } catch (error) {
      console.error('Error registering user:', error)
      if (error.code === '23505') {
        return response.badRequest({ message: 'E-mail já está em uso.' })
      }
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}
