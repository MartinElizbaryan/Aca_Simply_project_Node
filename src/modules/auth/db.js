import { hashPassword, comparePassword, generateToken } from "../../helpers/common.js"
import { prisma } from "../../services/Prisma.js"
const { user } = prisma

export const createUserDB = async (data) => {
  try {
    const password = await hashPassword(data.password)
    const { confirmedPassword, ...restData } = data
    const createdUser = await user.create({
      data: {
        ...restData,
        password,
      },
    })
    return {
      data: createdUser,
      error: null,
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
    if (!foundUser)
      return {
        auth: false,
        message: "User not found!",
      }
    const isPasswordCorrect = await comparePassword(password, foundUser.password)
    if (!isPasswordCorrect)
      return {
        auth: false,
        message: "Invalid username/password!",
      }
    const accessToken = generateToken({ id: foundUser.id })
    return {
      auth: true,
      accessToken,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
