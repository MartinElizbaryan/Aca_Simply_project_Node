import { Router } from "express"
import * as service from "./services.js"

const router = Router()

router.get("/", service.getAllFAQ)

export { router as faqRoutes }
