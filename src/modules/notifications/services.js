import * as db from "./db.js"

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
    const result = await db.getUnreadNotificationsDB(req.auth.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateNotificationSeen = async (req, res, next) => {
  try {
    const result = await db.updateNotificationIsSeenDB(req.auth.id, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteNotification = async (req, res, next) => {
  try {
    const result = await db.deleteNotificationDB(req.auth.id, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
