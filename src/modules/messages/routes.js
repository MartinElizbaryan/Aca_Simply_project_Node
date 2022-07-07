import { Router } from "express"
import * as service from "./services.js"
import auth from "../../middlewares/auth.middleware.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { getAllMessagesSchema, createMessageSchema, seenMessageSchema } = validations

const router = Router()

router.get("/unread", auth, service.unreadMessage)
router.post("/send-answers", service.sendAnswers)
router.get("/:id", auth, validate(getAllMessagesSchema), service.getAllMessages)
router.post("/:id", auth, validate(createMessageSchema), service.createMessage)
router.patch("/:id", auth, validate(seenMessageSchema), service.seenMessage)
export { router as messagesRoutes }
