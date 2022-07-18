import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as db from "../modules/auth/db.js"

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

export const generateToken = (payload, type) => {
  const expiresIn = type === "access" ? 60 * 30 : 60 * 60 * 24 * 30
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn,
  })
  return token
}

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    return payload
  } catch (error) {
    return null
  }
}

export const verifyUser = async (password, user) => {
  if (!user) {
    return {
      auth: false,
      message: "user not found",
    }
  }
  const isPasswordCorrect = await comparePassword(password, user.password)
  if (!isPasswordCorrect) {
    return {
      auth: false,
      message: "email/password is invalid",
    }
  }
  if (!user.is_verified) {
    return {
      auth: false,
      message: "email is not confirmed",
    }
  }
  return {
    auth: true,
  }
}

export const refreshTokens = async (token, payload) => {
  try {
    const { id } = payload
    const result = await db.deleteTokenDB(token)
    if (result?.error?.code === "P2025")
      return {
        error,
      }
    const accessToken = generateToken(payload, "access")
    const refreshToken = generateToken(payload, "refresh")
    const { error } = await db.createTokenDB(id, refreshToken)
    if (error) return { error }
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  } catch (error) {
    return { error }
  }
}
