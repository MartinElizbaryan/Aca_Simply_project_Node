import { Router } from "express"
import * as service from "./services.js"
import auth from "../../middlewares/auth.middleware.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { createPostSchema, getPostByIdSchema, deletePostSchema } = validations

const router = Router()

router.get("/", service.getAllPosts)
router.post("/", auth, validate(createPostSchema), service.createPost)
router.get("/favorites", auth, service.getAllFavorites)
router.get("/my-posts", auth, service.getAllMyPosts)
router.get("/confirmed-posts", auth, service.getAllConfirmedPosts)
router.get("/:id", validate(getPostByIdSchema), service.getPostById)
router.get(
  "/:id/with-questions",
  auth,
  validate(getPostByIdSchema),
  service.getPostWithQuestionsById
)
router.put("/:id", auth, service.updatePost)
router.delete("/:id", auth, validate(deletePostSchema), service.deletePost)
router.patch("/completed/:id", auth, validate(getPostByIdSchema), service.updateCompleted)
router.patch("/confirmed/:id", auth, validate(getPostByIdSchema), service.updateConfirmed)
router.delete("/delete-confirmed/:id", auth, validate(getPostByIdSchema), service.deleteConfirmed)

export { router as postsRoutes }
