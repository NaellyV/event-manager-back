import vine from '@vinejs/vine'

export const updateEventValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    date: vine.string(),
    hour: vine.string(),
    longitude: vine.number(),
    latitude: vine.number(),
    description: vine.string().trim(),
  })
)
