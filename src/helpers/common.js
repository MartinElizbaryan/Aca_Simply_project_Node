import bcrypt from "bcrypt"
import path from "path"
import jwt from "jsonwebtoken"
import { promises as fs } from "fs"
import { transporter } from "../services/Mail.js"

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
  } catch (error) {
    console.log(error)
  }
}
