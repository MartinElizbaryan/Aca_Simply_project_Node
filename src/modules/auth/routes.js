import { Router } from "express"
import * as service from "./services.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const {
  createUserSchema,
  findUserSchema,
  forgotPasswordSchema,
  verifyCodeSchema,
  changePasswordSchema,
} = validations

const router = Router()

router.get("/verify/:link", service.updateVerified)
router.post("/sign-up", validate(createUserSchema), service.signUp)
router.post("/sign-in", validate(findUserSchema), service.signIn)
router.delete("/sign-out", service.signOut)
router.post("/refresh-token", service.refreshToken)
router.delete("/sign-out-other-devices", service.deleteRefreshToken)
router.post("/forgot-password", validate(forgotPasswordSchema), service.forgotPassword)
router.post("/verify-code", validate(verifyCodeSchema), service.verifyResetCode)
router.post("/change-password", validate(changePasswordSchema), service.changePassword)

export { router as authRoutes }
