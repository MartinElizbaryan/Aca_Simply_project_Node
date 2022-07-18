import {
  changeQuestionsDataStructure,
  createNotification,
  sendNotification,
  uploadImagesToCloudinary,
} from "../../helpers/common.js"
import * as db from "./db.js"

export const getAllPosts = async (req, res, next) => {
  try {
    // console.log(req.query)
    const { take, page = 1, type = "LOST", category: categoriesData, search } = req.query
    const skip = (page - 1) * take
    const categories = categoriesData?.map((id) => +id) || []

    const result = await db.getAllPostsDB({
      search,
      skip,
      take: +take,
      type: type.toUpperCase(),
      categories,
      userId: req.auth?.id,
    })

    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getAllFavorites = async (req, res, next) => {
  try {
    const result = await db.getAllFavoritesDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const result = await db.getPostByIdDB(req.params.id, req.auth?.id)
    if (!result.error && (+req.auth?.id !== result.post.user_id || !req.auth))
      await db.updatePostViewsDB(result.post.user_id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
export const getAllMyPosts = async (req, res, next) => {
  try {
    const result = await db.getAllMyPostsDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
export const getAllConfirmedPosts = async (req, res, next) => {
  try {
    const result = await db.getAllConfirmedPostsDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getPostWithQuestionsById = async (req, res, next) => {
  try {
    const result = await db.getPostWithQuestionsByIdDB(req.params.id)
    if (!result.error && (+req.auth?.id !== result.post.user_id || !req.auth))
      await db.updatePostViewsDB(result.post.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const { images, questions } = req.body
    res.json({
      status: 200,
    })
    const notificationBeforeCreate = await createNotification(
      "beforePostCreate",
      { user_id: req.auth.id },
      false
    )
    sendNotification(notificationBeforeCreate)

    await uploadImagesToCloudinary(images)
    const questionsData = changeQuestionsDataStructure(questions)

    const result = await db.createPostDB({
      ...req.body,
      questions: questionsData,
      user_id: req.auth.id,
    })
    if (result.error) {
      const notificationOnErrorCreate = await createNotification(
        "onErrorPostCreate",
        { user_id: req.auth.id },
        false
      )
      sendNotification(notificationOnErrorCreate)
    }

    const notificationAfterCreate = await createNotification("afterPostCreate", result.post, false)
    sendNotification(notificationAfterCreate)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    res.json({ status: 200 })

    const notificationBeforeupdate = await createNotification(
      "beforePostUpdate",
      { user_id: req.auth.id },
      false
    )
    sendNotification(notificationBeforeupdate)

    const { images } = req.body
    await uploadImagesToCloudinary(images)
    const result = await db.updatePostDB(req.body, req.params.id, req.auth.id)

    if (result.error) {
      const notificationOnErrorUpdate = await createNotification(
        "onErrorPostUpdate",
        { user_id: req.auth.id },
        false
      )
      sendNotification(notificationOnErrorUpdate)
    }

    const notificationAfterUpdate = await createNotification(
      "afterPostUpdate",
      {
        ...res.body,
        user_id: req.auth.id,
      },
      false
    )
    sendNotification(notificationAfterUpdate)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateConfirmed = async (req, res, next) => {
  try {
    // const result = await db.confirmedPostDB(req.params.id, req.auth.id)
    const { post } = await db.getPostByIdDB(req.params.id)
    const notificationConfirmedPost = await createNotification(
      "confirmedPost",
      { user_id: post.user_id, id: req.params.id },
      false
    )
    sendNotification(notificationConfirmedPost)
    res.json("result")
  } catch (error) {
    next(error)
  }
}

export const deleteConfirmed = async (req, res, next) => {
  try {
    const result = await db.deleteConfirmedDB(req.params.id, req.auth.id)
    res.json(result)
  } catch (error) {
    console.log(error)
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
