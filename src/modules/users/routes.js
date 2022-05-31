import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { getAllUsers, getUserById } from './services.js'
import { createUser } from './services.js'


const { getUserByIdSchema } = validations

const router = Router()

router.get('/', getAllUsers)
router.get('/:companyId', validate(getUserByIdSchema), getUserById)
router.post("/", createUser);

export { router as companiesRoutes }
