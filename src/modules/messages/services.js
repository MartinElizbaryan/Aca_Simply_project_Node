// import { responseDataCreator } from "../../helpers/common.js"
import * as db from "./db.js"

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await db.getAllMessagesDB(req.params.id)
    res.json(messages)
  } catch (error) {
    next(error)
  }
}

export const createMessage = async (req, res, next) => {
  try {
    const message = await db.createMessageDb(req.body, req.params.id)
    console.log(message)
    res.json({
      status: 200,
    })
  } catch (error) {
    next(error)
  }
}
