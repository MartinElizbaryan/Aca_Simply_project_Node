import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

async function main() {
  const password = "qwerty"
  const messages = ["Hello", "Hi", "Barev"]
  const faq = [
    {
      question: "Finding lost property: what is the process ?",
      answer:
        "When you submit your claim online we will post it on our database and keep it public. Members may also upload photographs of lost property that they loose or find and provide detailed descriptions for our database so others can identify your property rapidly and more accurately than ever before.",
    },
    {
      question: "What happens if my item is not found immediately?",
      answer:
        "If an immediate match is not found, we will keep your inquiry in our database until we find it.",
    },
    {
      question: "What can I do to help increase the chances of finding my item?",
      answer: "Please provide detailed, accurate descriptions on the Item Report Form.",
    },
    {
      question: "If I don't live close by how will I get my lost property back?",
      answer:
        "It's very simple - once someone contacts you that your property has been found, you will arrange with them to send it to you.",
    },
  ]

  await prisma.user.upsert({
    where: { email: "brad@gmail.com" },
    update: {},
    create: {
      email: "brad@gmail.com",
      password,
      name: "Brad",
      surname: "Gibson",
      phone: "+37493-65-65-65",
      posts: {
        create: {
          name: "Phone",
          description: "Phone",
          address: "Yerevan",
          type: "FIND",
          questions: {
            create: [
              {
                title: "What is your phone's model?",
                answers: {
                  create: [
                    {
                      title: "Iphone",
                      status: false,
                    },
                    {
                      title: "Samsung",
                      status: true,
                    },
                    {
                      title: "Xiaomi",
                      status: false,
                    },
                  ],
                },
              },
              {
                title: "What color is your phone?",
                answers: {
                  create: [
                    {
                      title: "Black",
                      status: false,
                    },
                    {
                      title: "White",
                      status: false,
                    },
                    {
                      title: "Red",
                      status: true,
                    },
                    {
                      title: "Blue",
                      status: false,
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: "ann@gmail.com" },
    update: {},
    create: {
      email: "ann@gmail.com",
      password,
      name: "Ann",
      surname: "Brown",
      posts: {
        create: {
          name: "Bag",
          description: "Bag",
          address: "Abovyan",
          type: "LOST",
          questions: {
            create: [
              {
                title: "What color is your bag?",
                answers: {
                  create: [
                    {
                      title: "Black",
                      status: true,
                    },
                    {
                      title: "White",
                      status: false,
                    },
                    {
                      title: "Red",
                      status: false,
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  })
  await prisma.user.upsert({
    where: { email: "john@gmail.com" },
    update: {},
    create: {
      email: "john@gmail.com",
      password,
      name: "John",
      surname: "Smith",
      is_admin: true,
    },
  })
  messages.forEach(async (message) => {
    await prisma.message.create({
      data: {
        text: message,
        from_id: 1,
        to_id: 2,
      },
    }),
      await prisma.message.create({
        data: {
          text: message,
          from_id: 2,
          to_id: 1,
        },
      })
  })
  faq.forEach(async (question) => {
    await prisma.faq.create({
      data: question,
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
