import { Router } from "express"
import * as service from "./services.js"
import validate from "../../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { updateTrustedSchema, deletePostSchema } = validations

const router = Router()

router.patch("/trusted/:id", validate(updateTrustedSchema), service.updateTrusted)
router.delete("/:id", validate(deletePostSchema), service.deletePost)

export { router as adminPostsRoutes }
