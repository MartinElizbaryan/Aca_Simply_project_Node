import { Router } from "express"
import { postsRoutes } from "../modules/posts/routes.js"
import { usersRoutes } from "../modules/users/routes.js"
import { messagesRoutes } from "../modules/messages/routes.js"

const router = Router()

router.use("/posts", postsRoutes)
router.use("/users", usersRoutes)
router.use("/messages", messagesRoutes)

export { router as v1 }
