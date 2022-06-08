import bcrypt from "bcrypt"
import {promises as fs} from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import { transporter } from "../services/MailService.js"

import { badRequestErrorCreator, unAuthorizedErrorCreator } from "./errors.js"

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

export const generateToken = (payload, expiresIn) => {
  const jwtSecret = process.env.JWT_SECRET || "simply"
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn,
  })
  return token
}

export const verifyToken = (token) => {
  const jwtSecret = process.env.JWT_SECRET || "simply"
  try {
    const isTokenValid = jwt.verify(token, jwtSecret)
    return isTokenValid
  } catch (error) {
    return null
  }
}

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const answer = verifyToken(token)
    const { id } = answer
    if (id) {
      req.auth = { id }
      return next()
    }
  } catch (error) {
    next(unAuthorizedErrorCreator(error.details))
  }
}

export const sendActivationMail = async (to, link) => {
  try {
    const file = await fs.readFile(`${path.resolve()}/public/message.html`, "utf-8")
    const html = file.replace("verification-link", link)
    await transporter.sendMail({
      from: {
        name: "Lost & Found",
        address: process.env.SMTP_USER,
      },
      to,
      subject: "Verify your email address",
      html,
    })
    console.log("email send")
  } catch (error) {
    console.log("email not sent")
    console.log(error)
  }
}
