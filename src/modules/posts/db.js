import { prisma } from "../../services/Prisma.js"

const { post } = prisma

export const getAllPostsDB = async ({ skip, take, type, categories, userId }) => {
  console.log(userId)
  try {
    const query = {
      orderBy: {
        id: "desc",
      },
      where: {
        type,
        category_id: { in: categories },
      },
      include: {
        user: true,
        category: true,
      },
    }

    if (userId) {
      query.include.favorites = {
        where: {
          user_id: +userId,
        },
      }
    }

    if (take) {
      query.take = take
      query.skip = skip || 0
    }

    const posts = await post.findMany(query)

    return {
      posts,
    }
  } catch (error) {
    console.log(error)
    return {
      error,
    }
  }
}
export const getAllFavoritesDB = async (userId) => {
  try {
    const posts = await post.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        favorites: {
          some: {
            user_id: +userId,
          },
        },
      },
      include: {
        category: true,
      },
    })

    return {
      posts,
    }
  } catch (error) {
    console.log(error)
    return {
      error,
    }
  }
}

export const getPostByIdDB = async (id) => {
  try {
    const foundPost = await post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: true,
        category: true,
      },
    })
    return {
      post: foundPost,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const getPostWithQuestionsByIdDB = async (id) => {
  try {
    const foundPost = await post.findUnique({
      where: {
        id: +id,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        category: true,
      },
    })
    return {
      post: foundPost,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const createPostDB = async (data) => {
  try {
    const { images, questions, ...restData } = data

    await prisma.post.create({
      data: {
        ...restData,
        images: {
          create: images,
        },
        questions: {
          create: questions,
        },
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

export const updatePostDB = async (data, id, userId) => {
  const { deleted_images: deletedImages, images, ...restData } = data

  try {
    await post.update({
      where: {
        id: +id,
        user_id: +userId,
      },
      data: {
        ...restData,
        images: {
          create: images,
          delete: deletedImages,
        },
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

export const confirmedPostDB = async (id, userId) => {
  try {
    await post.update({
      where: {
        id: +id,
      },
      data: {
        confirmer_id: +userId,
      },
    })
    return {
      status: 200,
    }
  } catch (error) {
    return {
      error: error,
    }
  }
}

export const deleteConfirmedDB = async (id, userId) => {
  try {
    await post.update({
      where: {
        id: +id,
        user_id: +userId,
      },
      data: {
        confirmer_id: null,
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

export const completedPostDB = async (id, userId) => {
  try {
    await post.update({
      where: {
        id: +id,
        user_id: +userId,
      },
      data: {
        completed: true,
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

export const deletePostDB = async (id, userId) => {
  try {
    await post.delete({
      where: {
        id: +id,
        user_id: +userId,
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
