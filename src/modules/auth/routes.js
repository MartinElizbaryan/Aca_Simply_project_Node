import { Router } from "express"
import { validate } from "../../helpers/common.js"
import validations from "./validations.js"
import { signUp, signIn, signOut, verifyUser } from "./services.js"

const { createUserSchema, findUserSchema } = validations

const router = Router()

router.post("/sign-up", validate(createUserSchema), signUp)
router.post("/sign-in", validate(findUserSchema), signIn)
router.post("/sign-out", signOut)

router.get("/verify/:id/:hash", verifyUser)

export { router as authRoutes }
