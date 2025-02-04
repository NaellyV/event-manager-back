import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Enrollement from './enrollement.js'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare date: string

  @column()
  declare time: string

  @column()
  declare longitude: number

  @column()
  declare latitude: number

  @column()
  declare description: string

  @column()
  declare userId: number

  @column()
  declare idAdmin: number

  @hasMany(() => Enrollement)
  declare enrollements: relations.HasMany<typeof Enrollement>

  @belongsTo(() => User, {
    foreignKey: 'idAdmin',
  })
  declare admin: relations.BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
