import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { getUserById, updateUser, addMoney } from './services.js'

// const { getUserByIdSchema } = validations

const router = Router()

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.patch("/:id/add-money", addMoney);

export { router as usersRoutes }
