import * as db from "./db.js"

export const updateTrusted = async (req, res, next) => {
  try {
    const result = await db.trustedPostDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const result = await db.deletePostDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
