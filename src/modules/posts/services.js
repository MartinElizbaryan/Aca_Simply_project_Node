import { changeQuestionsDataStructure, uploadImagesToCloudinary } from "../../helpers/common.js"
import * as db from "./db.js"

export const getAllPosts = async (req, res, next) => {
  try {
    const { take, page = 1, type = "LOST", category: categoriesData } = req.query
    const skip = (page - 1) * take
    console.log("awdawdawd", categoriesData)
    console.log(take, page, skip, type, categoriesData)
    console.log(req.query)
    const categories = categoriesData?.map((id) => +id) || []

    const result = await db.getAllPostsDB({
      skip,
      take: +take,
      type,
      categories,
      userId: req.auth?.id,
    })

    res.json(result)
  } catch (error) {
    console.log("service", error)
    next(error)
  }
}

export const getAllFavorites = async (req, res, next) => {
  try {
    const result = await db.getAllFavoritesDB(req.auth.id)
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const result = await db.getPostByIdDB(req.params.id)
    if (!result.error && (+req.auth?.id !== result.post.user_id || !req.auth))
      await db.updatePostViewsDB(result.post.user_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getPostWithQuestionsById = async (req, res, next) => {
  try {
    const result = await db.getPostWithQuestionsByIdDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
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
  try {
    const result = await db.updatePostDB(req.body, req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateConfirmed = async (req, res, next) => {
  try {
    const result = await db.confirmedPostDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteConfirmed = async (req, res, next) => {
  try {
    const result = await db.deleteConfirmedDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateCompleted = async (req, res, next) => {
  try {
    const result = await db.completedPostDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const result = await db.deletePostDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
