import { responseDataCreator } from '../../helpers/common.js'
import * as db from './db.js'

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.getAllPostsDB()
    res.json(responseDataCreator(posts))
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

export const createPost = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await db.createPostDB(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const result = await db.updatePostDB(req.body, req.params.id)
    res.json(result)
    // if(!result.error) res.json({status:200,message:"Your post has been updated!"})
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
