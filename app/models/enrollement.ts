import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Event from './event.js'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Enrollement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date()
  declare date: DateTime

  @column()
  declare eventId: number

  @belongsTo(() => Event, {
    foreignKey: 'eventId',
  })
  declare event: relations.BelongsTo<typeof Event>

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
