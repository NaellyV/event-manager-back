import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Event from './event.js'

export default class History extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column()
  declare event_id: number

  @belongsTo(() => Event)
    declare events: BelongsTo<typeof Event>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
