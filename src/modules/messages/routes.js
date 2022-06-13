import { Router } from "express"
import * as service from "./services.js"
import auth from "../../middlewares/auth.middleware.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { getAllMessagesSchema, createMessageSchema } = validations

const router = Router()

router.get("/:id", auth, validate(getAllMessagesSchema), service.getAllMessages)
router.post("/:id", auth, validate(createMessageSchema), service.createMessage)

export { router as messagesRoutes }
