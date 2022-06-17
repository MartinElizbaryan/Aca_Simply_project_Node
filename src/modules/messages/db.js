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
