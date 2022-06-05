import Joi from "joi"

export default {
  createUserSchema: {
    body: Joi.object({
      name: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Zա-ևԱ-Ֆ-]+$/)
        .required(),
      surname: Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Zա-ևԱ-Ֆ-]+$/)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .max(15)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required(),
      phone: Joi.string()
        .min(10)
        .max(30)
        .pattern(/^[0-9+-]+$/),
    }),
  },
  findUserSchema: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .max(15)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required(),
    }),
  },
}
