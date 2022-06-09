import { prisma } from "../../../services/Prisma.js"

const { post } = prisma

export const trustedPostDB = async (id) => {
  try {
    const trustedPost = await post.update({
      where: {
        id: +id,
      },
      data: {
        trusted: true,
      },
    })
    return {
      data: trustedPost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const deletePostDB = async (id) => {
  try {
    const deletedPost = await post.delete({
      where: {
        id: +id,
      },
    })
    return {
      data: deletedPost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
