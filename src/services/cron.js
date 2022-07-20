import cron from "node-cron"
import {
  deleteOldPostsAndSendNotification,
  sendNotificationBeforePostDeletion,
} from "../helpers/cronActions.js"

export const job = cron.schedule("* * */1 * *", async () => {
  try {
    await sendNotificationBeforePostDeletion()
    await deleteOldPostsAndSendNotification()
    console.log("Running cron")
  } catch (e) {
    console.log(e)
  }
})
