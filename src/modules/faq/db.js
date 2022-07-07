import { prisma } from "../../services/prisma.js"

const { faq } = prisma

export const getAllFAQDB = async () => {
  try {
    const foundFAQ = await faq.findMany()
    return {
      faq: foundFAQ,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
