import { prisma } from "../../services/Prisma.js"

const { post } = prisma

export const getAllPostsDB = async () => {
  try {
    const posts = await post.findMany()
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
    })
    return {
      data: onePost,
      error: null,
    }
  } catch (error) {
    console.log("Error")
    return {
      data: null,
      error,
    }
  }
}

export const createPostDB = async (data) => {
  try {
    const newPost = await post.create({
      data,
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
  try {
    const updatedPost = await post.update({
      where: {
        id: +id,
      },
      data,
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
