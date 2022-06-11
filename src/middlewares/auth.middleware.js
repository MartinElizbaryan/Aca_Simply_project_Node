import { verifyToken } from "../helpers/common.js"
import { unauthorizedErrorCreator } from "../helpers/errors.js"

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = verifyToken(token)
    if (payload) {
      const { id, is_admin } = payload
      req.auth = { id, is_admin }
      return next()
    }
  } catch (error) {
    next(unauthorizedErrorCreator(error.details))
  }
}
