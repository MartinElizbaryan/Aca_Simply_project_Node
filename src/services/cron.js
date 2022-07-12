import cron from "node-cron"
import { sendNotificationBeforePostDeletion } from "../helpers/cronActions.js"

export const job = cron.schedule("*/15 * * * *", async () => {
  try {
    await sendNotificationBeforePostDeletion()
    // await sendNotificationAfterPostDeletion()
    console.log("Running cron")
  } catch (e) {
    console.log(e)
  }
})
