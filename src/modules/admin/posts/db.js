import { prisma } from "../../../services/Prisma.js"

const { post } = prisma

export const notTrustedDB = async () => {
  try {
    const posts = await post.findMany({
      where: {
        trusted: false,
      },
      include: {
        images: true,
        user: true,
        category: true,
        favorites: true,
      },
    })
    return {
      posts,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

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
