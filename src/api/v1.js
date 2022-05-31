import { Router } from 'express'
import { postsRoutes } from '../modules/posts/routes.js'

const router = Router()

router.use('/posts', postsRoutes)

export { router as v1 }
