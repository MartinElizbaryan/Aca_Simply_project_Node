import { Router } from "express"
import { validate } from "../../../helpers/common.js"
import validations from "./validations.js"
import { updateTrusted, deletePost } from "./services.js"

const { updateTrustedSchema, deletePostSchema } = validations

const router = Router()

router.patch("/trusted/:id", validate(updateTrustedSchema), updateTrusted)
router.delete("/:id", validate(deletePostSchema), deletePost)

export { router as adminPostsRoutes }
