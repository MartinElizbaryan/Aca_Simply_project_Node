import * as db from "./db.js"
import { createManyMessageDB } from "./db.js"
import { eventHandleSend } from "../../index.js"
import { getAnswerByIdDB } from "../answers/db.js"

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
    const data = await Promise.all(
      req.body.questions.map(async (question) => {
        const answer = question.answers.find((item) => {
          return item.checked
        })

        const answerFromDb = await getAnswerByIdDB(answer.id)
        console.log(answerFromDb)

        return {
          from_id: +req.auth.id,
          to_id: +req.body.user_id,
          text: `${question.title} - ${answer.title} ${
            answerFromDb.status ? "Right ANSWER" : "WRONG ANSWER"
          }`,
        }
      })
    )
    data.unshift({
      from_id: +req.auth.id,
      to_id: +req.body.user_id,
      text: `Post name: ${req.body.post_title}`,
    })

    console.log("--------------------------------")
    console.log("data", data)
    console.log("--------------------------------")

    const result = await createManyMessageDB(data)

    data.forEach((q) => {
      eventHandleSend(q)
    })

    console.log(data)
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
