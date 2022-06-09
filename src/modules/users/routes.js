import { Router } from "express"
import { checkAuth, validate } from "../../helpers/common.js"
import validations from "./validations.js"
import { findUser, updateUser, addMoney, findMe } from "./services.js"

const { findUserSchema, updateUserSchema, addMoneySchema } = validations

const router = Router()

router.get("/me", checkAuth, findMe)
router.get("/:id", checkAuth, validate(findUserSchema), findUser)
router.put("/:id", validate(updateUserSchema), updateUser)
router.patch("/:id/add-money", validate(addMoneySchema), addMoney)

export { router as usersRoutes }
