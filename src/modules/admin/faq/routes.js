import { Router } from "express"
import * as service from "./services.js"
import validate from "../../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { createFAQSchema, getFAQByIdSchema, updateFAQSchema, deleteFAQSchema } = validations

const router = Router()

router.post("/", validate(createFAQSchema), service.createFAQ)
router.get("/", service.getAllFAQ)
router.get("/:id", validate(getFAQByIdSchema), service.getFAQById)
router.put("/:id", validate(updateFAQSchema), service.updateFAQ)
router.delete("/:id", validate(deleteFAQSchema), service.deleteFAQ)

export { router as adminFAQRoutes }
