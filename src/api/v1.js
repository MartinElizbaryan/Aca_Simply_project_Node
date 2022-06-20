import { Router } from "express"
import { postsRoutes } from "../modules/posts/routes.js"
import { usersRoutes } from "../modules/users/routes.js"
import { messagesRoutes } from "../modules/messages/routes.js"
import { authRoutes } from "../modules/auth/routes.js"
import { categoriesRoutes } from "../modules/categories/routes.js"
import { favoritesRoutes } from "../modules/favorites/routes.js"
import { adminRoutes } from "../modules/admin/routes.js"
import { contactRoutes } from "../modules/contact/routes.js"

const router = Router()

router.use("/users", usersRoutes)
router.use("/auth", authRoutes)
router.use("/posts", postsRoutes)
router.use("/messages", messagesRoutes)
router.use("/categories", categoriesRoutes)
router.use("/favorites", favoritesRoutes)
router.use("/admin", adminRoutes)
router.use("/contact", contactRoutes)

export { router as v1 }
