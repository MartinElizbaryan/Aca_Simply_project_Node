import Joi from "joi"

export default {
  getUserByIdSchema: {
    params: Joi.object({
      userId: Joi.number().integer().required(),
    }),
  },
}
