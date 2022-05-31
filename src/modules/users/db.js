import { prisma } from "../../services/Prisma.js"

const { user } = prisma

export const getAllUsersDB = async () => {
  try {
    const users = await user.findMany()
    return {
      data: users,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const getCompanyByIdDB = async () => {
  // res.send('comp')
}

export const createUserDb = async (sentData) => {
  try {
    const newUser = await user.create({
      sentData,
    })
    return {
      data: newUser,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
