import { unauthorizedErrorCreator } from "../helpers/errors.js"
import { refreshTokens, verifyToken } from "../helpers/authHelpers.js"

export default async (req, res, next) => {
  try {
    if (req.auth) next()
    else {
      const refreshTokenFromCookies = req.cookies.refreshToken
      if (!refreshTokenFromCookies) throw new Error("Unauthorized")
      const payload = verifyToken(refreshTokenFromCookies)
      if (!payload) throw new Error("Unauthorized")
      const { id, is_admin } = payload
      const { accessToken, refreshToken, error } = await refreshTokens(refreshTokenFromCookies, {
        id,
        is_admin,
      })
      if (error) throw new Error("Unauthorized")
      res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      })
      res.cookie("accessToken", accessToken, {
        maxAge: 60 * 2 * 1000,
      })
      req.auth = { id, is_admin }
      next()
    }
  } catch (error) {
    next(unauthorizedErrorCreator(error.message))
  }
}
