import { Router } from "express"
import * as service from "./services.js"

const router = Router()

router.get("/", service.getAllCategories)

export { router as categoriesRoutes }
