import Joi from "joi"

export default {
  updateNotificationSeenSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  deleteNotificationSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
