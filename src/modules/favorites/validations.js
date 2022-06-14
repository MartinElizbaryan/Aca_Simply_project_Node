import Joi from "joi"

export default {
  createFavoritesSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  deleteFavoritesSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
