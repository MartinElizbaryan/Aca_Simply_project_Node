import { changeQuestionsDataStructure, uploadImagesToCloudinary } from "../../helpers/common.js"
import * as db from "./db.js"

export const getAllPosts = async (req, res, next) => {
  console.log("getAllPosts")
  try {
    console.log(req.auth)
    const take = +req.query.take
    const skip = ((req.query.page || 1) - 1) * take
    const type = req.query.type || "LOST"
    const categoriesData = req.query.category || ""
    const categories = categoriesData.map((id) => +id)

    // console.log(type)
    const result = await db.getAllPostsDB({ skip, take, type, categories, userId: req.auth?.id })
    res.json(result)
  } catch (error) {
    console.log("service", error)
    next(error)
  }
}

export const getAllFavorites = async (req, res, next) => {
  console.log("getAllFavorites")
  try {
    const result = await db.getAllFavoritesDB(req.auth.id)
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  console.log("getPostById")
  try {
    const result = await db.getPostByIdDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getPostWithQuestionsById = async (req, res, next) => {
  console.log("getPostWithQuestionsById")
  try {
    const result = await db.getPostWithQuestionsByIdDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  console.log("createPost")
  try {
    const { images, questions } = req.body
    await uploadImagesToCloudinary(images)
    const questionsData = changeQuestionsDataStructure(questions)
    const result = await db.createPostDB({
      ...req.body,
      questions: questionsData,
      user_id: req.auth.id,
    })
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  console.log("updatePost")
  try {
    const result = await db.updatePostDB(req.body, req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateConfirmed = async (req, res, next) => {
  console.log("updateConfirmed")
  try {
    const result = await db.confirmedPostDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteConfirmed = async (req, res, next) => {
  console.log("deleteConfirmed")
  try {
    const result = await db.deleteConfirmedDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateCompleted = async (req, res, next) => {
  console.log("updateCompleted")
  try {
    const result = await db.completedPostDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  console.log("deletePost")
  try {
    const result = await db.deletePostDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
