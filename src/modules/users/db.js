import { prisma } from "../../services/Prisma.js"

const { user } = prisma

export const updateUserDB = async (data, id) => {
  try {
    const updatedUser = await user.update({
      where: {
        id: +id,
      },
      data,
    })
    return {
      data: updatedUser,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const findUserDB = async (id) => {
  try {
    const foundUser = await user.findUnique({
      where: {
        id: +id,
      },
      include: {
        posts: true,
        confirmedPosts: true,
      },
    })
    return {
      data: foundUser,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const addMoneyDB = async (data, id) => {
  try {
    const userMoney = await user.update({
      where: {
        id: +id,
      },
      data: {
        money: {
          increment: data.money,
        },
      },
    })
    return {
      data: userMoney,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
