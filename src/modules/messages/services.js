import { responseDataCreator } from "../../helpers/common.js"
import * as db from "./db"

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await db.getAllMessagesDB()
    res.json(messages)
  } catch (error) {
    next(error)
  }
}

export const createMessage = async (req, res, next) => {
  try {
    const message = await db.createMessageDb(req.body)
    res.json({
      status: 200
    })
  } catch (error) {
    next(error)
  }
}
