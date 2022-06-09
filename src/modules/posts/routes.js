import { Router } from "express"
import { validate } from "../../helpers/common.js"
import validations from "./validations.js"
import * as service from "./services.js"

const { createPostSchema, getPostByIdSchema, deletePostSchema } = validations

const router = Router()

router.get("/", service.getAllPosts)
router.post("/", validate(createPostSchema), service.createPost)
router.get("/:id", validate(getPostByIdSchema), service.getPostById)
router.get("/:id/with-questions", validate(getPostByIdSchema), service.getPostWithQuestionsById)
router.put("/:id", service.updatePost)
router.delete("/:id", validate(deletePostSchema), service.deletePost)
router.patch("/completed/:id", validate(getPostByIdSchema), service.updateCompleted)
router.patch("/confirmed/:id", validate(getPostByIdSchema), service.updateConfirmed)
router.delete("/delete-confirmed/:id", validate(getPostByIdSchema), service.deleteConfirmed)

export { router as postsRoutes }
