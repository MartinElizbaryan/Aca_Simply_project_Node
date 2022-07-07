import { prisma } from "../../services/prisma.js"

const { favorite } = prisma

export const createFavoritesDB = async (id, userId) => {
  try {
    await favorite.create({
      data: {
        post_id: +id,
        user_id: +userId,
      },
    })
    return {
      status: 200,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
export const deleteFavoritesDB = async (id, userId) => {
  try {
    await favorite.deleteMany({
      where: {
        AND: [
          {
            post_id: +id,
          },
          {
            user_id: +userId,
          },
        ],
      },
    })
    return {
      status: 200,
    }
  } catch (error) {
    console.log(error)
    return {
      error,
    }
  }
}
