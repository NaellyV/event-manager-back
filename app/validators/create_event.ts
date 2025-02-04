import vine from '@vinejs/vine'

export const createEventValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    date: vine.string(),
    time: vine.string(),
    location: vine.string(),
    description: vine.string().trim(),
    userId: vine.number(),
  })
)
