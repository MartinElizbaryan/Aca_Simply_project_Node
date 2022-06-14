import { Router } from "express"
import * as service from "./services.js"
import auth from "../../middlewares/auth.middleware.js"
import validate from "../../middlewares/validate.middleware.js"
import validations from "./validations.js"

const { createFavoritesSchema, deleteFavoritesSchema } = validations

const router = Router()

router.post("/:id", auth, validate(createFavoritesSchema), service.createFavorites)
router.delete("/:id", auth, validate(deleteFavoritesSchema), service.deleteFavorites)

export { router as favoritesRoutes }
