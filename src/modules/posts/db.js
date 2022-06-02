import { prisma } from "../../services/Prisma.js"

const { post } = prisma

export const getAllPostsDB = async () => {
  try {
    const posts = await post.findMany({
      includes
    })
    return {
      data: posts,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const getPostByIdDB = async (id) => {
  try {
    const onePost = await post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: true
      }
    })
    return {
      data: onePost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const getPostWithQuestionsByIdDB = async (id) => {
  try {
    const onePost = await post.findUnique({
      where: {
        id: +id,
      },
      include: {
        questions: {
          include: {
            answers: true
          }
        }
      }
    })
    // check auth.id from onePost.user_id
    return {
      data: onePost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createPostDB = async (data) => {
  const { images, questions, ...restData } = data;

  const questionsData = questions.map(item => {
    const {answers, ...restData} = item;
    return {
      ...restData,
      answers: {
        create: answers
      }
    }
  })

  // image uploading in cloudinary

  try {
    const newPost = await post.create({
      data: {
        ...restData,
        images: {
          create: images,
        },
        questions: {
          create: questionsData
        },
      },
    })
    return {
      data: newPost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const updatePostDB = async (data, id) => {
  const { deleted_images: deletedImages, images, questions, ...restData } = data;

  try {
    const updatedPost = await post.update({
      where: {
        id: +id,
      },
      data: {
        ...restData,
        images: {
          create: images,
          delete: deletedImages
        },
      },
    })
    return {
      data: updatedPost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const confirmedPostDB = async (id) => {
  try {
    const confirmedPost = await post.update({
      where: {
        id: +id,
      },
      data: {
        confirmer_id: 1, //auth id
      },
    })
    return {
      data: confirmedPost,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const deleteConfirmedDB = async (id) => {
  try {
    const deleted = await post.update({
      where: {
        id: +id,
      },
      data: {
        confirmer_id: null,
      },
    })
    return {
      data: deleted,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const completedPostDB = async (id) => {
  try {
    const completedPost = await post.update({
      where: {
        id: +id,
      },
      data: {
        completed: true,
      },
    })
    return {
      data: completedPost,
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
