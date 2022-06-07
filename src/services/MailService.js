import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Verify your email address",
    text: "",
    html: `
      <div>
        <h3>To help protect your privacy (and be sure we have the right address), please tap the link below.</h3>
        <a href=${link}>${link}</a>
        <hr/>
        <h5>If you received this email by mistake, please ignore it.</h5>
      </div>
    `,
  })
}
