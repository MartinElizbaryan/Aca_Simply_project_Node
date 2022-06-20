import * as db from "./db.js"

export const updateUser = async (req, res, next) => {
  try {
    const result = await db.updateUserDB(req.body, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const findUserChat = async (req, res, next) => {
  try {
    const result = await db.findUserChatDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const findUser = async (req, res, next) => {
  try {
    const result = await db.findUserDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const findMe = async (req, res, next) => {
  try {
    const result = await db.findMeDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const addMoney = async (req, res, next) => {
  try {
    const result = await db.addMoneyDB(req.body, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
