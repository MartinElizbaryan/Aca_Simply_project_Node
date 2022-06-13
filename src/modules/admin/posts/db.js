import { prisma } from "../../../services/Prisma.js"

const { post } = prisma

export const trustedPostDB = async (id) => {
  try {
    await post.update({
      where: {
        id: +id,
      },
      data: {
        trusted: true,
      },
    })
    return {
      status: 204,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const deletePostDB = async (id) => {
  try {
    await post.delete({
      where: {
        id: +id,
      },
    })
    return {
      status: 204,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
