import Joi from "joi"

export default {
  findUserSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
  updateUserSchema: {
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
        .min(9)
        .max(30)
        .pattern(/^[0-9+-]+$/)
        .allow(""),
    }),
  },
  addMoneySchema: {
    body: Joi.object({
      money: Joi.number().integer().positive().required(),
    }),
  },
  changePasswordSchema: {
    body: Joi.object({
      currentPassword: Joi.string().min(6).max(15).alphanum().required(),
      newPassword: Joi.string().min(6).max(15).alphanum().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")),
    }),
  },
}
