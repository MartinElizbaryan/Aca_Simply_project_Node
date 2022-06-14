import * as db from "./db.js"

export const createFavorites = async (req, res, next) => {
  try {
    const result = await db.createFavoritesDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
export const deleteFavorites = async (req, res, next) => {
  try {
    const result = await db.deleteFavoritesDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}