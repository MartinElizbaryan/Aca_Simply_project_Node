import { unauthorizedErrorCreator } from "../helpers/errors.js"

export default async (req, res, next) => {
  try {
    if (req.auth) next()
    else throw new Error("Unauthorized")
  } catch (error) {
    next(unauthorizedErrorCreator(error.message))
  }
}
