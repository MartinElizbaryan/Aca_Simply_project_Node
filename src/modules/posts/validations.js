import Joi from "joi"

export default {
  getPostByIdSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },

  createPostSchema: {
    body: Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string(),
      address: Joi.string(),
      type: Joi.string().valid('LOST', 'FOUND'),
      images: Joi.array().items(
        Joi.object({
          src: Joi.string(),
        })
      ),
      questions: Joi.array().items(
        Joi.object({
          title: Joi.string().min(3).max(50).required(),
          answers: Joi.array().items(
            Joi.object({
              title: Joi.string().min(2).max(50).required(),
              status: Joi.boolean().required()
            })
          )
        })
      ),
    })
  },
  
  deletePostSchema: {
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  },
}
