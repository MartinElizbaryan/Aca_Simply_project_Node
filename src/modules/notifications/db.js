import { prisma } from "../../services/prisma.js"

const { notification } = prisma

export const getAllNotificationsDB = async (authId) => {
  try {
    const notifications = await notification.findMany({
      where: {
        user_id: +authId,
      },
      orderBy: {
        id: "desc",
      },
    })
    return {
      notifications,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const getUnreadNotificationsDB = async (authId) => {
  try {
    const count = await notification.aggregate({
      _count: {
        id: true,
      },
      where: {
        user_id: +authId,
        is_seen: false,
      },
    })
    return count
  } catch (error) {
    return {
      error,
    }
  }
}

export const createNotificationDB = async (data) => {
  try {
    const newNotification = await notification.create({
      data,
    })
    return {
      notification: newNotification,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const updateNotificationIsSeenDB = async (authId, id) => {
  try {
    await notification.updateMany({
      where: {
        id: +id,
        user_id: +authId,
      },
      data: {
        is_seen: true,
      },
    })

    return {
      status: 204,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const deleteNotificationDB = async (authId, id) => {
  try {
    await notification.deleteMany({
      where: {
        id: +id,
        user_id: +authId,
      },
    })
    return {
      status: 204,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
