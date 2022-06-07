import { Router } from "express"
import { validate } from "../../helpers/common.js"
import validations from "./validations.js"
import { createUser, findUser } from "./services.js"

const { createUserSchema, findUserSchema } = validations

const router = Router()

router.post("/sign-up", validate(createUserSchema), createUser)
router.post("/sign-in", validate(findUserSchema), findUser)
// router.post("/sign-out", validate(findUserSchema), findUser)

export { router as authRoutes }
