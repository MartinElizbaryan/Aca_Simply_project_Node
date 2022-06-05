import * as db from "./db.js"

export const createUser = async (req, res, next) => {
  try {
    const createdUser = await db.createUserDB(req.body)
    res.json(createdUser)
  } catch (error) {
    next(error)
  }
}

export const findUser = async (req, res, next) => {
  try {
    const foundUser = await db.findUserDB(req.body)
    res.json(foundUser)
  } catch (error) {
    next(error)
  }
}
