import { Router } from "express"
import { checkAuth, checkAdmin } from "../../helpers/common.js"
import { adminPostsRoutes } from "./posts/routes.js"

const router = Router()

router.use("/posts", checkAuth, checkAdmin, adminPostsRoutes)

export { router as adminRoutes }
