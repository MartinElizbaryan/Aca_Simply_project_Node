import { prisma } from "../../services/Prisma.js"

const { user } = prisma

export const updateUserDB = async (data, id) => {
  try {
    await user.update({
      where: {
        id: +id,
      },
      data,
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

export const findUserDB = async (id) => {
  try {
    const foundUser = await user.findUnique({
      where: {
        id: +id,
      },
      include: {
        posts: true,
      },
    })
    return {
      user: foundUser,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const findMeDB = async (id) => {
  try {
    const foundUser = await user.findUnique({
      where: {
        id: +id,
      },
    })
    return {
      user: foundUser,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const addMoneyDB = async (data, id) => {
  try {
    await user.update({
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
      status: 200,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
