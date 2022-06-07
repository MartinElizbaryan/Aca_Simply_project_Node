import { hashPassword, comparePassword, generateToken } from "../../helpers/common.js"
import { prisma } from "../../services/Prisma.js"
const { user, token } = prisma

export const createUserDB = async (data) => {
  try {
    const password = await hashPassword(data.password)
    const { name, surname, email } = data
    const createdUser = await user.create({
      data: {
        name,
        surname,
        email,
        password,
      },
    })
    return {
      user: createdUser,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const findUserDB = async ({ email, password }) => {
  try {
    const foundUser = await user.findUnique({
      where: {
        email,
      },
    })
    if (!foundUser) {
      return {
        auth: false,
        message: "User not found!",
      }
    }
    const isPasswordCorrect = await comparePassword(password, foundUser.password)
    if (!isPasswordCorrect) {
      return {
        auth: false,
        message: "Invalid username/password!",
      }
    }
    return {
      auth: true,
      id: foundUser.id,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createTokenDB = async (payload) => {
  try {
    const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_EXPIRE_TIME)
    const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_EXPIRE_TIME)
    await token.create({
      data: {
        user_id: payload.id,
        token: refreshToken,
      },
    })
    return {
      accessToken,
      refreshToken,
      error: null,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const deleteTokenDB = async (token) => {
  try {
    await token.delete({
      where: {
        token,
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
