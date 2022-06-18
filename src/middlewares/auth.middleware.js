import { unauthorizedErrorCreator } from "../helpers/errors.js"
import { findTokenDB } from "../modules/auth/db.js"

export default async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const { token } = await findTokenDB(refreshToken)
    if (req.auth && token) next()
    else throw new Error("Unauthorized")
  } catch (error) {
    next(unauthorizedErrorCreator(error.message))
  }
}
