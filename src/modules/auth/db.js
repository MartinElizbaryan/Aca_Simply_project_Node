import { v4 } from "uuid"
import { prisma } from "../../services/prisma.js"
import { hashPassword } from "../../helpers/authHelpers.js"
import { sendActivationMail } from "../../helpers/mailSenders.js"

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
          verification_code: v4(),
        },
      })
      await sendActivationMail(
        createdUser.email,
        `${process.env.SERVER_BASE_URL}/auth/verify/${createdUser.verification_code}`
      )
      return {
        status: 200,
      }
    })
  } catch (error) {
    console.log(error.code)
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
    console.log("delete", error)
    return {
      error,
    }
  }
}

export const updateVerifiedDB = async (link) => {
  try {
    await user.update({
      where: {
        verification_code: link,
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
    await token.deleteMany({
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
    console.log(error)
    return {
      error,
    }
  }
}

export const updateUserResetCodeDB = async (id, reset_code) => {
  try {
    await user.update({
      where: {
        id,
      },
      data: {
        reset_code,
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

export const updateUserPasswordDB = async (reset_code, password) => {
  try {
    await user.update({
      where: {
        reset_code,
      },
      data: {
        password,
        reset_code: null,
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

export const findUserResetCodeDB = async (code) => {
  try {
    const foundUser = await user.findUnique({
      where: {
        reset_code: code,
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
