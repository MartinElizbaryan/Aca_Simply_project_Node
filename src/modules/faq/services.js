import * as db from "./db.js"

export const getAllFAQ = async (req, res, next) => {
  try {
    const result = await db.getAllFAQDB()
    res.json(result)
  } catch (error) {
    next(error)
  }
}