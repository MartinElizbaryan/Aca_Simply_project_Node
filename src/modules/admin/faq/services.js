import * as db from "./db.js"

export const createFAQ = async (req, res, next) => {
  try {
    const result = await db.createFAQDB(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getAllFAQ = async (req, res, next) => {
  try {
    const result = await db.getAllFAQDB()
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getFAQById = async (req, res, next) => {
  try {
    const result = await db.getFAQByIdDB(req.params.id)
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateFAQ = async (req, res, next) => {
  try {
    const result = await db.updateFAQDB(req.body, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteFAQ = async (req, res, next) => {
  try {
    const result = await db.deleteFAQDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
