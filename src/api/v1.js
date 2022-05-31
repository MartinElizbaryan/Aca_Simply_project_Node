import { Router } from 'express'
import { companiesRoutes } from '../modules/companies/routes.js'

const router = Router()

router.use('/companies', companiesRoutes)

export { router as v1 }
