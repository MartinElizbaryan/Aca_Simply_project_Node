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
    let { users } = await db.findUserChatDB(req.auth.id)
    const { users: usersSort } = await db.findUserChatWithAllMessagesDB(req.auth.id)

    users = users.map((user, index) => {
      const fromIdLength = usersSort[index].messages_from.length
      let fromId = usersSort[index].messages_from[fromIdLength - 1]?.id
      const toIdLength = usersSort[index].messages_to.length
      let toId = usersSort[index].messages_to[toIdLength - 1]?.id

      fromId = fromId ? fromId : 0
      toId = toId ? toId : 0
      user.lastMessage = fromId > toId ? fromId : toId
      return user
    })

    users.sort((a, b) => {
      return b.lastMessage - a.lastMessage
    })

    res.json({ users })
  } catch (error) {
    console.log(error)
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
