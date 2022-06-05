import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { badRequestErrorCreator } from "./errors.js"

export const validate = (schema) => {
  if (typeof schema !== "object" || schema === null) throw new Error("Schema is not an object")

  return async (req, res, next) => {
    const { params, body } = req

    try {
      schema.params && (await schema.params.validateAsync(params))
      schema.body && (await schema.body.validateAsync(body))
      return next()
    } catch (error) {
      next(badRequestErrorCreator(error.details))
    }
  }
}

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

export const generateToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET || "simply"
  const accessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: 1800,
  })
  return accessToken
}

export const verifyToken = (accessToken) => {
  const jwtSecret = process.env.JWT_SECRET || "simply"
  try {
    const isTokenValid = jwt.verify(accessToken, jwtSecret)
    return isTokenValid
  } catch (error) {
    return null
  }
}
