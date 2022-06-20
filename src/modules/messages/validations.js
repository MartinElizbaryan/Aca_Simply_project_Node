import Joi from "joi"

export default {
  getAllMessagesSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },

  createMessageSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },

  seenMessageSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
