import { sendContactMail } from "../../helpers/mailSenders.js"

export const sendMail = async (req, res, next) => {
  try {
    const result = await sendContactMail(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
