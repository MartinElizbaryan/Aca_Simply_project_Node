import moment from "moment"
import { io, users } from "../index.js"
import { findOldPostsDB } from "../modules/posts/db.js"
import { createNotificationDB, getUnreadNotificationsDB } from "../modules/notifications/db.js"

export const sendNotificationBeforePostDeletion = async () => {
  const posts29DaysOld = await findOldPostsDB(29)
  for (const post of posts29DaysOld) {
    const text = `Your "${post.name}" post created at ${moment(post.created_at).format(
      "ll"
    )}  will be deleted tomorrow at 9PM.`
    const data = {
      text,
      user_id: post.user_id,
      post_id: post.id,
    }
    const { notification } = await createNotificationDB(data)
    const { _count } = await getUnreadNotificationsDB(post.user_id)

    io.to(users[post.user_id]).emit("receiveNotification", {
      notification,
      unread: _count.id,
    })
  }
}

export const sendNotificationAfterPostDeletion = async () => {
  const posts30DaysOld = await findOldPostsDB(30)

  // await deleteOldPostsDB(30)
  for (const post of posts30DaysOld) {
    const text = `Your "${post.name}" post created at ${moment(post.created_at).format(
      "ll"
    )} has been deleted.`
    const data = {
      text,
      user_id: post.user_id,
    }
    const { notification } = await createNotificationDB(data)
    const { _count } = await getUnreadNotificationsDB(post.user_id)

    io.to(users[post.user_id]).emit("receiveNotification", {
      notification,
      unread: _count.id,
    })
  }
}
