import { prisma } from "../../services/Prisma.js"

const { message } = prisma

export const getAllMessagesDB = async (fromId, toId) => {
  try {
    const messages = await message.findMany({
      include: {
        from: true,
        to: true,
      },
      where: {
        OR: [
          {
            from_id: +fromId,
            to_id: +toId,
          },
          {
            from_id: +toId,
            to_id: +fromId,
          },
        ],
      },
    })
    return {
      messages,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const createMessageDB = async (data, fromId, toId) => {
  try {
    const newMessage = await message.create({
      data: {
        text: data.text,
        from_id: +fromId,
        to_id: +toId,
      },
    })
    return {
      message: newMessage,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const seenMessageDB = async (authId, fromId) => {
  try {
    await message.updateMany({
      data: {
        is_seen: true,
      },
      where: {
        from_id: +fromId,
        to_id: +authId,
      },
    })
  } catch (error) {
    return {
      error,
    }
  }
}

export const unreadMessageDB = async (authId) => {
  try {
    const count = await message.aggregate({
      _count: {
        id: true,
      },
      where: {
        to_id: +authId,
      },
    })

    return count
  } catch (error) {
    return {
      error,
    }
  }
}


