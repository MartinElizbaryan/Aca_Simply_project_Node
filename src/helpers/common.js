import bcrypt from "bcrypt"
import path from "path"
import jwt from "jsonwebtoken"
import { promises as fs } from "fs"
import { transporter } from "../services/Mail.js"
import cloudinary from "../services/Cloudinary.js"

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

export const generateToken = (payload, type) => {
  const expiresIn = type === "access" ? 60 * 60 * 30 : 60 * 60 * 24 * 30
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
    const file = await fs.readFile(`${path.resolve()}/public/verificationMessage.html`, "utf-8")
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

export const sendResetMail = async (to, code) => {
  try {
    const file = await fs.readFile(`${path.resolve()}/public/resetMessage.html`, "utf-8")
    const html = file.replace("reset_code", code)
    await transporter.sendMail({
      from: {
        name: "Lost & Found",
        address: process.env.SMTP_USER,
      },
      to,
      subject: "Reset Password",
      html,
    })
  } catch (error) {
    console.log(error)
  }
}

export const sendContactMail = async ({ name, surname, email, subject, message }) => {
  try {
    await transporter.sendMail({
      from: {
        name: `${name} ${surname}`,
        address: email,
      },
      to: process.env.SMTP_USER,
      subject,
      text: `From:  ${email} \n\n${message}`,
    })
  } catch (error) {
    console.log(error)
  }
}

export const uploadImagesToCloudinary = async (images) => {
  for await (const image of images) {
    console.log(image)
    const uploadedResponse = await cloudinary.uploader.upload(image.src)
    image.src = uploadedResponse.public_id
  }
}

export const changeQuestionsDataStructure = (questions) => {
  return questions.map((question) => {
    const { answers, ...restData } = question
    return {
      ...restData,
      answers: {
        create: answers,
      },
    }
  })
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

export const generateRandom6DigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000)
}
