import * as db from "./db.js"
import { updateDateDB } from "../posts/db.js"
import { createNotification } from "../../helpers/common.js"

export const getAllNotifications = async (req, res, next) => {
  try {
    const result = await db.getAllNotificationsDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getUnreadNotifications = async (req, res, next) => {
  try {
    const { _count } = await db.getUnreadNotificationsDB(req.auth.id)
    res.json({
      count: _count.id,
    })
  } catch (error) {
    next(error)
  }
}

export const updateNotificationSeen = async (req, res, next) => {
  try {
    const { status } = await db.updateNotificationIsSeenDB(req.auth.id, req.params.id)
    const { notifications } = await db.getAllNotificationsDB(req.auth.id)
    const { _count } = await db.getUnreadNotificationsDB(req.auth.id)
    res.json({
      status,
      notifications,
      count: _count.id,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteNotification = async (req, res, next) => {
  try {
    const { status } = await db.deleteNotificationDB(req.auth.id, req.params.id)
    const { notifications } = await db.getAllNotificationsDB(req.auth.id)
    const { _count } = await db.getUnreadNotificationsDB(req.auth.id)
    res.json({
      status,
      notifications,
      count: _count.id,
    })
  } catch (error) {
    next(error)
  }
}

export const delayPostDelete = async (req, res, next) => {
  try {
    const { error } = await updateDateDB(req.auth.id, req.body.postId)
    if (!error) {
      await db.deleteNotificationDB(req.auth.id, req.params.id)
      await createNotification("afterDelay", {
        id: req.body.postId,
        user_id: req.auth.id,
      })
      const { notifications } = await db.getAllNotificationsDB(req.auth.id)
      const { _count } = await db.getUnreadNotificationsDB(req.auth.id)
      res.json({
        status: 200,
        notifications,
        count: _count.id,
      })
    }
  } catch (error) {
    next(error)
  }
}
