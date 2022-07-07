import { prisma } from "../../../services/prisma.js"

const { faq } = prisma

export const createFAQDB = async (data) => {
  try {
    await faq.create({
      data,
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

export const getAllFAQDB = async () => {
  try {
    const foundFAQ = await faq.findMany()
    return {
      faq: foundFAQ,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

export const getFAQByIdDB = async (id) => {
  try {
    const foundFAQ = await faq.findUnique({
      where: {
        id: +id,
      },
    })
    return {
      faq: foundFAQ,
    }
  } catch (error) {
    console.log(error)
    return {
      error,
    }
  }
}

export const updateFAQDB = async (data, id) => {
  console.log(data)
  try {
    await faq.update({
      where: {
        id: +id,
      },
      data,
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

export const deleteFAQDB = async (id) => {
  try {
    await faq.delete({
      where: {
        id: +id,
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
