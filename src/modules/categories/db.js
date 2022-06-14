import { prisma } from "../../services/Prisma.js"

const { category } = prisma

export const getAllCategoriesDB = async () => {
  try {
    const categories = await category.findMany({})
    return {
      categories,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
