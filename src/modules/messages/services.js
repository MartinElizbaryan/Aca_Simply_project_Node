import * as db from "./db.js"
import { createManyMessageDB } from "./db.js";

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

export const seenMessage = async (req, res, next) => {
  try {
    const result = await db.seenMessageDB(req.auth.id, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const unreadMessage = async (req, res, next) => {
  try {
    const result = await db.unreadMessageDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
export const sendAnswers = async (req, res, next) => {
  try {
    const data = req.body.questions.map((question) => {
      const answer = question.answers.find((item) => {
        return item.checked
      })
      return {
        from_id: +req.auth.id,
        to_id: +req.body.user_id,
        text: `${question.title} - ${answer.title}`,
      }
    })
    data.unshift({
      from_id: +req.auth.id,
      to_id: +req.body.user_id,
      text: `Post name: ${req.body.post_title}`,
    })
    const result = await createManyMessageDB(data)
    res.json(result)

  } catch (error) {
    console.log(error)
    next(error)
  }
}