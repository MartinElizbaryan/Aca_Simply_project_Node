import { hashPassword, comparePassword, generateToken } from "../../helpers/common.js"
import { prisma } from "../../services/Prisma.js"
const { user, token } = prisma

export const createUserDB = async (data) => {
  try {
    const { name, surname, email, password } = data
    const hash = await hashPassword(password)
    const createdUser = await user.create({
      data: {
        name,
        surname,
        email,
        password: hash,
      },
    })
    return {
      user: createdUser,
    }
  } catch (error) {
    console.log(error.message)
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
    if (!foundUser.is_verified) {
      return {
        auth: false,
        message: "Please, confirm your email address first!",
      }
    }
    return {
      auth: true,
      payload: {
        id: foundUser.id,
        is_admin: foundUser.is_admin,
      },
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
    const accessToken = generateToken(payload, "access")
    const refreshToken = generateToken(payload, "refresh")
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
export const deleteTokenWithoutYourDB = async ({ token, id }) => {
  try {
    await token.delete({
      where: {
        user_id: id,
        NOT: {
          token,
        },
      },
    })
  } catch (error) {
    return {
      error,
    }
  }
}
