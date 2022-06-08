import * as db from "./db.js"
import { verifyToken } from "../../helpers/common.js"
import {deleteTokenWithOutYourDB} from "./db.js";

export const signUp = async (req, res, next) => {
  try {
    const { user } = await db.createUserDB(req.body)
    // if (error) res.json(user)

    const { accessToken, refreshToken, error } = await db.createTokenDB({ id: user.id })
    console.log(accessToken, error, "---")
    if (error) res.json(error)

    res.cookie("refreshToken", refreshToken, {
      maxAge: process.env.REFRESH_TOKEN_EXPIRE_TIME * 1000,
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

export const signIn = async (req, res, next) => {
  try {
    const user = await db.findUserDB(req.body)
    if (!user.auth) res.json(user)

    const { accessToken, refreshToken, error } = await db.createTokenDB({ id: user.id })
    if (error) res.json(error)

    res.cookie("refreshToken", refreshToken, {
      maxAge: process.env.REFRESH_TOKEN_EXPIRE_TIME * 1000,
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
    await db.deleteTokenDB(refreshToken)
    res.clearCookie("refreshToken")
    res.json({
      auth: false,
    })
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (req, res, next) => {
  try {
    const refreshTokenFromCookies = req.cookies.refreshToken
    const { id } = verifyToken(refreshTokenFromCookies)
    await db.deleteTokenDB(refreshTokenFromCookies)

    const { accessToken, refreshToken, error } = await db.createTokenDB({ id })
    if (error) res.json(error)

    res.cookie("refreshToken", refreshToken, {
      maxAge: process.env.REFRESH_TOKEN_EXPIRE_TIME * 1000,
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

    await db.deleteTokenWithOutYourDB({ refreshToken, id })

    res.json({
      auth: true,
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}