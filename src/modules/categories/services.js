import * as db from "./db.js"

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await db.getAllCategoriesDB()
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}