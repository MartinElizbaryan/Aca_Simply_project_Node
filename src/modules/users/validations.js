import Joi from "joi"

export default {
  findUserSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  updateUserSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      name: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Zա-ևԱ-Ֆ-]+$/),
      surname: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Zա-ևԱ-Ֆ-]+$/),
      phone: Joi.string()
        .min(10)
        .max(30)
        .pattern(/^[0-9+-]+$/),
    }),
  },
  addMoneySchema: {
    body: Joi.object({
      money: Joi.number().integer().positive().required(),
    }),
  },
}
