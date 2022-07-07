import cron from "node-cron"
import { prisma } from "./prisma.js"

const { post } = prisma

export const job = cron.schedule("* * */1 * * *", async () => {
  try {
  } catch (e) {
    console.log(e)
  }
})
