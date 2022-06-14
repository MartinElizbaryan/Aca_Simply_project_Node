import Joi from "joi"

export default {
  createFAQSchema: {
    body: Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }),
  },
  getFAQByIdSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  updateFAQSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      question: Joi.string(),
      answer: Joi.string(),
    }),
  },
  deleteFAQSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
