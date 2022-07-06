import { prisma } from "../../services/Prisma.js"

const { post } = prisma

export const getAllPostsDB = async ({ skip, take, type, categories, userId, search }) => {
  try {
    const where = {
      type,
      trusted: true,
    }

    const query = {
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        user: true,
        category: true,
        images: true,
      },
    }

    if (userId) {
      query.select.favorites = {
        where: {
          user_id: +userId,
        },
      }
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ]
    }

    if (categories.length) {
      where.category_id = { in: categories }
    }

    if (take) {
      query.take = take
      query.skip = skip || 0
    }

    query.where = where

    const posts = await post.findMany(query)
    const count = await post.count({ where })

    return {
      posts,
      count,
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
        user: true,
        category: true,
        images: true,
        favorites: {
          where: {
            user_id: +userId,
          },
        },
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

export const getAllMyPostsDB = async (userId) => {
  try {
    const posts = await post.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        user_id: +userId,
      },
      include: {
        user: true,
        category: true,
        images: true,
        favorites: {
          where: {
            user_id: +userId,
          },
        },
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

export const getAllConfirmedPostsDB = async (userId) => {
  try {
    const posts = await post.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        confirmer_id: +userId,
      },
      include: {
        user: true,
        category: true,
        images: true,
        favorites: {
          where: {
            user_id: +userId,
          },
        },
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

export const getPostByIdDB = async (id, userId) => {
  try {
    const query = {
      where: {
        id: +id,
      },
      include: {
        user: true,
        category: true,
        images: true,
        confirmer: true,
      },
    }

    if (userId) {
      query.include.favorites = {
        where: {
          user_id: +userId,
        },
      }
    }

    const foundPost = await post.findUnique(query)

    return {
      post: foundPost,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const updatePostViewsDB = async (id) => {
  try {
    await post.update({
      where: {
        id: +id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })
    return {
      error: null,
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
        user: true,
        images: true,
        confirmer: true,
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
  // const { deleted_images: deletedImages, images, ...restData } = data
  console.log(id, "id")
  console.log("userId", userId)
  try {
    const a = await post.updateMany({
      where: {
        id: +id,
        user_id: +userId,
      },
      // data: {
      // ...restData,
      // images: {
      //   create: images,
      //   delete: deletedImages,
      // },
      // },
      data,
    })
    console.log("db answer", a)
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
    await post.updateMany({
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
    console.log(error)
    return {
      error,
    }
  }
}

export const completedPostDB = async (id, userId) => {
  try {
    await post.updateMany({
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
    await post.deleteMany({
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
