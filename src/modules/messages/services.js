import * as db from "./db.js"

export const getAllMessages = async (req, res, next) => {
  try {
    const result = await db.getAllMessagesDB(req.auth.id, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const createMessage = async (req, res, next) => {
  try {
    const result = await db.createMessageDB(req.body, req.auth.id, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
