import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { getAllPosts, getPostById, createPost, updatePost, updateConfirmed, updateCompleted, deleteConfirmed, deletePost } from './services.js'

const { getCompanyByIdSchema } = validations

const router = Router()

// router.get('/:companyId', validate(getCompanyByIdSchema), getCompanyById)
router.get("/", getAllPosts)
router.post("/", createPost)
router.get("/:id", getPostById)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.patch("/completed/:id", updateCompleted)
router.patch("/confirmed/:id", updateConfirmed)
router.delete("/delete-confirmed/:id", deleteConfirmed)

export { router as postsRoutes }
