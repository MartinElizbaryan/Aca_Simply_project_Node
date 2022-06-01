import { prisma } from "../../services/Prisma.js"

const { message } = prisma

export const getAllMessagesDB = async (id) => {
  try {
    const messages = await message.findMany({
      include: {
        from: true,
        to: true
      },
      where: {
        OR:[
          {
            from_id: 1,
            to_id: +id,
          },
          {
            from_id: +id,
            to_id: 1,
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

export const createMessageDb = async (data, id) => {
  console.log(data)
  try {
    const newMessage = await message.create({
      data: {
        message: data.message,
        from_id: 1, // here must be auth id,
        to_id: +id
      }
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
