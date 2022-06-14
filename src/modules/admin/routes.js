import { Router } from "express"
import auth from "../../middlewares/auth.middleware.js"
import admin from "../../middlewares/admin.middleware.js"
import { adminPostsRoutes } from "./posts/routes.js"
import { adminFAQRoutes } from "./faq/routes.js"

const router = Router()

router.use("/posts", auth, admin, adminPostsRoutes)
router.use("/faq", auth, admin, adminFAQRoutes)

export { router as adminRoutes }
