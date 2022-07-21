import { Router } from "express"
import * as service from "./services.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { findUserSchema, updateUserSchema, addMoneySchema, changePasswordSchema } = validations

const router = Router()

router.get("/me", service.findMe)
router.get("/chat", service.findUserChat)
router.get("/:id", validate(findUserSchema), service.findUser)
router.put("/", validate(updateUserSchema), service.updateUser)
router.patch("/add-money", validate(addMoneySchema), service.addMoney)
router.patch("/change-password", validate(changePasswordSchema), service.changePassword)

export { router as usersRoutes }
