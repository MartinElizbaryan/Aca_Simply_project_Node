import { transporter } from "../services/mail.js"
import { promises as fs } from "fs"
import path from "path"

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
