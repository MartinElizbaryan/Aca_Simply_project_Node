import * as db from "./db.js"
import cloudinary from "../../services/Cloudinary.js"

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.getAllPostsDB()
    res.json(posts.data)
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const post = await db.getPostByIdDB(req.params.id)
    res.json(post)
  } catch (error) {
    next(error)
  }
}

export const getPostWithQuestionsById = async (req, res, next) => {
  try {
    const post = await db.getPostWithQuestionsByIdDB(req.params.id)
    res.json(post)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const { images } = req.body

    for await (const image of images) {
      const uploadedResponse = await cloudinary.uploader.upload(image.src)
      image.src = uploadedResponse.public_id
    }

    const result = await db.createPostDB({ ...req.body, user_id: 1 })
    res.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const result = await db.updatePostDB(req.body, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateConfirmed = async (req, res, next) => {
  try {
    const result = await db.confirmedPostDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteConfirmed = async (req, res, next) => {
  try {
    const result = await db.deleteConfirmedDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateCompleted = async (req, res, next) => {
  try {
    const result = await db.completedPostDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const result = await db.deletePostDB(req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
