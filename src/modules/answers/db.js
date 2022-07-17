import { prisma } from "../../services/prisma.js"

const { answer } = prisma

export const getAnswerByIdDB = async (id) => {
  try {
    const query = {
      where: {
        id: +id,
      },
    }
    const foundAnswer = await answer.findUnique(query)

    return foundAnswer
  } catch (error) {
    return {
      error,
    }
  }
}
