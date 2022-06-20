import { Router } from "express"
import * as service from "./services.js"

import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { sendMailSchema } = validations

const router = Router()

router.post("/send", validate(sendMailSchema), service.sendMail)

export { router as contactRoutes }
