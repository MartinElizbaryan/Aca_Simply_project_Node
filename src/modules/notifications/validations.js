import Joi from "joi"

export default {
  updateNotificationSeenSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  delayDeletionSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      postId: Joi.number().integer().positive().required(),
    }),
  },
  deleteNotificationSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
