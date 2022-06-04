import { Router } from "express"
// import { validate } from "../../helpers/common.js"
// import validations from "./validations.js"
import * as service from "./services.js"

// const { getCompanyByIdSchema } = validations

const router = Router()

// router.get('/:companyId', validate(getCompanyByIdSchema), getCompanyById)
router.get("/", service.getAllPosts)
router.post("/", service.createPost)
router.get("/:id", service.getPostById)
router.get("/:id/with-questions", service.getPostWithQuestionsById)
router.put("/:id", service.updatePost)
router.delete("/:id", service.deletePost)
router.patch("/completed/:id", service.updateCompleted)
router.patch("/confirmed/:id", service.updateConfirmed)
router.delete("/delete-confirmed/:id", service.deleteConfirmed)

export { router as postsRoutes }
