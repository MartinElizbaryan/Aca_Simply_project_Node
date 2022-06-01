import * as db from "./db.js"

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await db.updateUserDB(req.body, req.params.id)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const findUser = async (req, res, next) => {
  try {
    const foundUser = await db.findUserDB(req.params.id)
    res.json(foundUser)
  } catch (error) {
    next(error)
  }
}

export const addMoney = async (req, res, next) => {
  try {
    const userMoney = await db.addMoneyDB(req.body, req.params.id)
    res.json(userMoney)
  } catch (error) {
    next(error)
  }
}
