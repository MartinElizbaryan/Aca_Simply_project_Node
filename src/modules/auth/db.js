import { v4 } from "uuid"
import { hashPassword, sendActivationMail } from "../../helpers/common.js"
import { prisma } from "../../services/Prisma.js"
const { user, token } = prisma

export const createUserDB = async (data) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const { name, surname, email, password } = data
      const hash = await hashPassword(password)
      const createdUser = await prisma.user.create({
        data: {
          name,
          surname,
          email,
          password: hash,
        },
      })
      await sendActivationMail(
        createdUser.email,
        `${process.env.SERVER_BASE_URL}/auth/verify/${createdUser.id}/${v4()}`
      )
      return {
        status: 200,
      }
    })
  } catch (error) {
    console.log(error.message)
    return {
      error,
    }
  }
}

export const findUserDB = async (email) => {
  try {
    const foundUser = await user.findUnique({
      where: {
        email,
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

export const findTokenDB = async (refreshToken) => {
  try {
    const foundToken = await token.findFirst({
      where: {
        token: refreshToken,
      },
    })
    return {
      token: foundToken,
    }
  } catch (error) {
    console.log(error)
    return {
      error,
    }
  }
}

export const createTokenDB = async (userId, refreshToken) => {
  try {
    await token.create({
      data: {
        user_id: userId,
        token: refreshToken,
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

export const deleteTokenDB = async (refreshToken) => {
  try {
    await token.delete({
      where: {
        token: refreshToken,
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

export const updateVerifiedDB = async (id) => {
  try {
    await user.update({
      where: {
        id: +id,
      },
      data: {
        is_verified: true,
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
export const deleteTokenWithoutYourDB = async ({ refreshToken, id }) => {
  try {
    await token.delete({
      where: {
        user_id: id,
        NOT: {
          token: refreshToken,
        },
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
