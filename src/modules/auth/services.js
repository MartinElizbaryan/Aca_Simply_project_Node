import path from "path"
import { sendResetMail } from "../../helpers/mailSenders.js"
import { generateRandom6DigitNumber } from "../../helpers/common.js"
import { badRequestErrorCreator, notFoundErrorCreator } from "../../helpers/errors.js"
import { generateToken, hashPassword, verifyToken, verifyUser } from "../../helpers/authHelpers.js"
import * as db from "./db.js"
import { sendEventViaSocketIdExpectCurrent } from "../../index.js"

export const signUp = async (req, res, next) => {
  try {
    const result = await db.createUserDB(req.body)
    if (result.error) {
      if (result.error.code === "P2002")
        throw badRequestErrorCreator("email address is already used")
    }
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
    if (!result.auth) throw badRequestErrorCreator(result.message)

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
      user,
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

export const deleteRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const { id } = verifyToken(refreshToken)
    const { socketId } = req.body

    const result = await db.deleteTokenWithoutYourDB({ refreshToken, id })
    console.log("req.auth", req.auth)
    sendEventViaSocketIdExpectCurrent(socketId, "signOut")

    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateVerified = async (req, res, next) => {
  try {
    const { error } = await db.updateVerifiedDB(req.params.link)
    if (error) res.json(error) // add html file
    res.sendFile(`${path.resolve()}/public/verified.html`)
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const { user } = await db.findUserDB(email)
    if (!user) throw notFoundErrorCreator("user not found")
    const code = String(generateRandom6DigitNumber())
    const result = await db.updateUserResetCodeDB(user.id, code)
    console.log(code)
    await sendResetMail(user.email, code)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const verifyResetCode = async (req, res, next) => {
  try {
    const { code } = req.body
    const { user } = await db.findUserResetCodeDB(code)
    if (!user) throw notFoundErrorCreator("code is not valid")
    res.json({
      status: 204,
      code,
    })
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const { password, code } = req.body
    const hash = await hashPassword(password)
    const result = await db.updateUserPasswordDB(code, hash)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
