import { sendContactMail } from "../../helpers/common.js"

export const sendMail = async (req, res, next) => {
  try {
    const result = await sendContactMail(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
