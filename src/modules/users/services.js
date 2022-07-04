import * as db from "./db.js"
import { comparePassword, hashPassword } from "../../helpers/common.js"
import { badRequestErrorCreator } from "../../helpers/errors.js"

export const updateUser = async (req, res, next) => {
  try {
    const result = await db.updateUserDB(req.body, req.auth.id)
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
    result.user.favorites = result.user.favorites.map((favorite) => favorite.post)
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

export const changePassword = async (req, res, next) => {
  try {
    const { user } = await db.findMeDB(req.auth.id)
    const isPasswordCorrect = await comparePassword(req.body.currentPassword, user.password)
    if (!isPasswordCorrect) throw badRequestErrorCreator("Current password is incorrect.")
    const hash = await hashPassword(req.body.newPassword)
    const result = await db.updateUserPasswordDB(hash, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
