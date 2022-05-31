import { responseDataCreator } from '../../helpers/common.js'
import { getAllUsersDB } from './db'
import { createUserDb } from './db'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDB()
    res.json(responseDataCreator(users))
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res) => {
  res.send('user')
}

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserDb(req.body)
    res.json(responseDataCreator(user))
  }
  catch(error) {
    next(error);
  }
}
