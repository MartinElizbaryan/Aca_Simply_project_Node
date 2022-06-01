import { prisma } from "../../services/Prisma.js"

const { message } = prisma

export const getAllMessagesDB = async () => {
  try {
    const messages = await message.findMany({
      include: {
        from: true,
        to: true
      },
      where: {
        OR:[
          {
            from_id:1,
            to_id:2
          },
          {
            from_id:2,
            to_id:1
          }
        ]
      }
    });
    return {
      data: messages,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const createMessageDb = async (data) => {
  try {
    const newMessage = await message.create({
      data,
    })
    return {
      data: newMessage,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
