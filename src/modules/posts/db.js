import cloudinary from "../../services/Cloudinary.js"
import { prisma } from "../../services/Prisma.js"

const { post } = prisma

export const getAllPostsDB = async () => {
  try {
    const posts = await post.findMany({
      include: {
        user: true,
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

export const getPostByIdDB = async (id) => {
  try {
    const foundPost = await post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: true,
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
    return await prisma.$transaction(async (post) => {
      const { images, questions, ...restData } = data

      for await (const image of images) {
        const uploadedResponse = await cloudinary.uploader.upload(image.src)
        image.src = uploadedResponse.public_id
      }

      const questionsData = questions?.map((item) => {
        const { answers, ...restData } = item
        return {
          ...restData,
          answers: {
            create: answers,
          },
        }
      })

      await post.create({
        data: {
          ...restData,
          images: {
            create: images,
          },
          questions: {
            create: questionsData,
          },
        },
      })

      return {
        status: 200,
      }
    })
  } catch (error) {
    return {
      error,
    }
  }
}

export const updatePostDB = async (data, id) => {
  const { deleted_images: deletedImages, images, questions, ...restData } = data

  try {
    const updatedPost = await post.update({
      where: {
        id: +id,
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

export const confirmedPostDB = async (id) => {
  try {
    await post.update({
      where: {
        id: +id,
      },
      data: {
        confirmer_id: 1, //auth id
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

export const deleteConfirmedDB = async (id) => {
  try {
    await post.update({
      where: {
        id: +id,
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

export const completedPostDB = async (id) => {
  try {
    await post.update({
      where: {
        id: +id,
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
