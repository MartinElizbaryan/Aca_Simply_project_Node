import path from "path"
import { verifyToken, verifyUser, generateToken } from "../../helpers/common.js"
import { unauthorizedErrorCreator } from "../../helpers/errors.js"
import * as db from "./db.js"

export const signUp = async (req, res, next) => {
  try {
    const result = await db.createUserDB(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { user } = await db.findUserDB(email)
    const result = await verifyUser(password, user)
    if (!result.auth) {
      console.log(result.message)
      throw unauthorizedErrorCreator(result.message)
    }

    const payload = {
      id: user.id,
      is_admin: user.is_admin,
    }
    const accessToken = generateToken(payload, "access")
    const refreshToken = generateToken(payload, "refresh")
    const { error } = await db.createTokenDB(user.id, refreshToken)
    if (error) {
      res.json(error)
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    })
    res.json({
      auth: true,
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const result = await db.deleteTokenDB(refreshToken)
    res.clearCookie("refreshToken")
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (req, res, next) => {
  try {
    const refreshTokenFromCookies = req.cookies.refreshToken
    const { id, is_admin } = verifyToken(refreshTokenFromCookies)
    await db.deleteTokenDB(refreshTokenFromCookies)

    const payload = {
      id,
      is_admin,
    }
    const accessToken = generateToken(payload, "access")
    const refreshToken = generateToken(payload, "refresh")
    const { error } = await db.createTokenDB(id, refreshToken)
    if (error) res.json(error)

    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    })
    res.json({
      auth: true,
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const { id } = verifyToken(refreshToken)

    const result = await db.deleteTokenWithoutYourDB({ refreshToken, id })

    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateVerified = async (req, res, next) => {
  try {
    const { error } = await db.updateVerifiedDB(req.params.id)
    if (error) res.json(error) // add html file
    res.sendFile(`${path.resolve()}/public/verified.html`)
  } catch (error) {
    next(error)
  }
}
