import { deleteOldPostsDB, findOldPostsDB } from "../modules/posts/db.js"
import { createNotification, sendNotification } from "./common.js"

export const sendNotificationBeforePostDeletion = async () => {
  const posts29DaysOld = await findOldPostsDB(29)
  for (const post of posts29DaysOld) {
    const notification = await createNotification("beforePostDeletion", post)
    await sendNotification(notification)
  }
}

export const deleteOldPostsAndSendNotification = async () => {
  const posts30DaysOld = await findOldPostsDB(30)

  const { error } = await deleteOldPostsDB(30)

  if (error) return

  for (const post of posts30DaysOld) {
    const notification = await createNotification("afterPostDeletion", {
      ...post,
      post_id: undefined,
    })
    await sendNotification(notification)
  }
}
