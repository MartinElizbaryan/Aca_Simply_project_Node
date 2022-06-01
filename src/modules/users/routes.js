import { Router } from "express"
// import { validate } from "../../helpers/common.js"
// import validations from "./validations.js"
import { findUser, updateUser, addMoney } from "./services.js"

// const { getUserByIdSchema } = validations

const router = Router()

router.get("/:id", findUser)
router.put("/:id", updateUser)
router.patch("/:id/add-money", addMoney)

export { router as usersRoutes }
