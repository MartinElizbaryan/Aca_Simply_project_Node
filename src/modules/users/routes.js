import { Router } from "express"
import * as service from "./services.js"
import auth from "../../middlewares/auth.middleware.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { findUserSchema, updateUserSchema, addMoneySchema } = validations

const router = Router()

router.get("/me", auth, service.findMe)
router.get("/chat", auth, service.findUserChat)
router.get("/:id", auth, validate(findUserSchema), service.findUser)
router.put("/:id", auth, validate(updateUserSchema), service.updateUser)
router.patch("/add-money", auth, validate(addMoneySchema), service.addMoney)

export { router as usersRoutes }
