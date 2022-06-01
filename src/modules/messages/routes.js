import { Router } from "express"
// import { validate } from "../../helpers/common.js"
// import validations from "./validations.js"
import { getAllMessages, createMessage } from "./services.js"

// const { getUserByIdSchema } = validations

const router = Router()

router.get("/:id", getAllMessages)
router.post("/:id", createMessage)

export { router as messagesRoutes }
