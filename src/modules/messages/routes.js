import { Router } from "express"
import { validate } from "../../helpers/common.js"
import validations from "./validations.js"
import { getAllMessages, createMessage } from "./services.js"

const { getAllMessagesSchema, createMessageSchema } = validations

const router = Router()

router.get("/:id", validate(getAllMessagesSchema), getAllMessages)
router.post("/:id", validate(createMessageSchema) ,createMessage)

export { router as messagesRoutes }
