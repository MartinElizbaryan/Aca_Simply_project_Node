import { Router } from "express"
import * as service from "./services.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { getAllMessagesSchema, createMessageSchema, seenMessageSchema } = validations

const router = Router()

router.get("/unread", service.unreadMessage)
router.post("/send-answers", service.sendAnswers)
router.get("/:id", validate(getAllMessagesSchema), service.getAllMessages)
router.post("/:id", validate(createMessageSchema), service.createMessage)
router.patch("/:id", validate(seenMessageSchema), service.seenMessage)
export { router as messagesRoutes }
