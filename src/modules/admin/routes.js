import { Router } from "express"
import { checkAuth, checkIsAdmin } from "../../helpers/common.js"
import { adminPostsRoutes } from "./posts/routes.js"

const router = Router()

router.use("/posts", checkAuth, checkIsAdmin, adminPostsRoutes)

export { router as adminRoutes }
