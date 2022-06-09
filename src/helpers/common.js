import bcrypt from "bcrypt"
import { promises as fs } from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import { transporter } from "../services/MailService.js"

import { badRequestErrorCreator, unauthorizedErrorCreator, forbiddenErrorCreator } from "./errors.js"

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

export const generateToken = (payload, type) => {
  const time = type === "access" ? 60 * 30 : 60 * 60 * 24 * 30
  const jwtSecret = process.env.JWT_SECRET || "simply"
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: time,
  })
  return token
}

export const verifyToken = (token) => {
  const jwtSecret = process.env.JWT_SECRET || "simply"
  try {
    const payload = jwt.verify(token, jwtSecret)
    return payload
  } catch (error) {
    return null
  }
}

export const checkAuth = async (req, res, next) => {
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

export const checkAdmin = async (req, res, next) => {
  const { is_admin } = req.auth
  if (is_admin) return next()
  else next(forbiddenErrorCreator("You don't have permission to access this resource."))
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
