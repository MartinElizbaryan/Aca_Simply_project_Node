import { Router } from "express"
import * as service from "./services.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { createUserSchema, findUserSchema } = validations

const router = Router()

router.get("/verify/:id/:link", service.updateVerified)
router.post("/sign-up", validate(createUserSchema), service.signUp)
router.post("/sign-in", validate(findUserSchema), service.signIn)
router.delete("/sign-out", service.signOut)
router.post("/refresh-token", service.refreshToken)
router.delete("/refresh-token", service.deleteRefreshToken)
router.post("/forgot-password", service.forgotPassword)
router.post("/reset-code", service.checkResetCode)
router.post("/change-password", service.changePassword)

export { router as authRoutes }
