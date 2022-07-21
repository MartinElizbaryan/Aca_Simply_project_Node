import { Router } from "express"
import { adminPostsRoutes } from "./posts/routes.js"
import { adminFAQRoutes } from "./faq/routes.js"

const router = Router()

router.use("/posts", adminPostsRoutes)
router.use("/faq", adminFAQRoutes)

export { router as adminRoutes }
