import moment from "moment"
import cloudinary from "../services/cloudinary.js"
import { notifications } from "../constants/notifications.js"
import { createNotificationDB, getUnreadNotificationsDB } from "../modules/notifications/db.js"
import { sendEventViaUserId } from "../index.js"

export const uploadImagesToCloudinary = async (images) => {
  for await (const image of images) {
    console.time("upload started")
    const uploadedResponse = await cloudinary.uploader.upload(image.src)
    console.timeEnd("upload started")
    image.src = uploadedResponse.public_id
  }
}

export const changeQuestionsDataStructure = (questions) => {
  return questions.map((question) => {
    const { answers, ...restData } = question
    return {
      ...restData,
      answers: {
        create: answers,
      },
    }
  })
}

export const generateRandom6DigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const dateDaysBack = (days) => {
  return new Date(Date.now() - 60 * 60 * 24 * days * 1000)
}

export const createNotificationText = (type, post) => {
  if (type === "afterDelay") {
    const date = moment().format("ll")
    return notifications[type].replace("'date'", date)
  }
  const date = moment(post.created_at).format("lll")
  return notifications[type].replace("name", post.name).replace("'date'", date)
}

export const createNotification = async (type, post, needToChange = true) => {
  const text = needToChange ? createNotificationText(type, post) : notifications[type]

  const data = {
    text,
    type,
    user_id: +post.user_id,
    post_id: +post.id || post.id,
  }
  console.log(data)
  const { notification } = await createNotificationDB(data)
  return notification
}

export const sendNotification = async (notification) => {
  const { _count } = await getUnreadNotificationsDB(notification.user_id)
  sendEventViaUserId(notification.user_id, "receiveNotification", {
    notification,
    count: _count.id,
  })
}
