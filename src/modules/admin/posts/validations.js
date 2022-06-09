import Joi from "joi"

export default {
  updateTrustedSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  deletePostSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
