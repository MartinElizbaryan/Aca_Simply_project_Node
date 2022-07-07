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
      status: 200,
      user: updatedUser,
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
export const findUserChatDB = async (id) => {
  try {
    const foundUsers = await user.findMany({
      // orderBy: {
      //   messages_from: {
      //     created_at: "asc",
      //   },
      // },
      where: {
        OR: [
          {
            messages_from: {
              some: {
                to_id: +id,
              },
            },
          },
          {
            messages_to: {
              some: {
                from_id: +id,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        surname: true,
        messages_from: {
          where: {
            to_id: +id,
            is_seen: false,
          },
        },
      },
    })
    console.log(foundUsers, "users")
    return {
      users: foundUsers,
    }
  } catch (error) {
    console.log(error)
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
      include: {
        favorites: {
          include: {
            post: {
              include: {
                user: true,
                category: true,
                images: true,
                favorites: true,
              },
            },
          },
        },
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

export const updateUserPasswordDB = async (password, id) => {
  try {
    await user.update({
      where: {
        id: +id,
      },
      data: {
        password,
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
