import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../src/helpers/authHelpers.js"

const prisma = new PrismaClient()

async function main() {
  const messages = ["Hello", "Hi", "Barev"]
  const faq = [
    {
      question: "What is Lost & Found?",
      answer:
        "Lost & Found is the search engine for lost and found property. All found items of honest individuals are published on Lost & Found. Together with our community we help to bring lost items back to their rightful owners. Please note that claims will be responded by the finder (organization or individual person). Lost & Found does not physically manage found objects.",
    },
    {
      question: "What is the minimal time taken for the posts to be published on the website?",
      answer:
        "Before publication, the post must be checked by our admins to make sure that it complies with the project rules. After verification, your post will be available to all users. It will take no more than 12 hours.",
    },
    {
      question: "How long will my post remain on the website?",
      answer:
        "Your post is automatically deactivated after 3 months. You will receive an email a week before D-Day and another on the day of deactivation. After this, your post will be automatically removed permanently from the website.",
    },
    {
      question: "What can I do to help increase the chances of finding my item?",
      answer:
        "Please provide detailed, accurate descriptions on the Post Create Form. If possible, gather descriptive information about the item before filling out the form, and be sure to include any identifiable details to help in the search. ",
    },
    {
      question: "I found my item. How do I delete my post?",
      answer: "Once you found or returned the item, sign in to your account to remove your post.",
    },
    {
      question: "How do I prove that I am the owner of an item?",
      answer:
        'First, claim the object by clicking on the button "This item is mine!". Answer a few questions about your item. These will be questions that only the owner can know the answers to and that can be seen and checked. The more information you provide, the easier it is to determine if you are the rightful owner. This will help to get your item back faster.',
    },
    {
      question: "Why do I need question fields in the Post Create Form?",
      answer:
        "These questions will help you find the rightful owner of the item. A user who wants to note that he has found your item or that you have found his/her item will have to answer the questions you have asked. We will inform you about his answers. That will allow you to detect fraudulent claims.",
    },
    {
      question: "How do I claim an item?",
      answer:
        "You can claim your item by directly contacting the person who has posted it. Meanwhile, you can also contact the lost and found networks team.",
    },
    {
      question: "If I don't live close by how will I get my lost property back?",
      answer:
        "It's very simple - once someone contacts you that your property has been found, you will arrange with them to send it to you.",
    },
  ]
  const categories = [
    {
      name: "Bags",
    },
    {
      name: "Keys",
    },
    {
      name: "Pets",
    },
    {
      name: "Cloths",
    },
    {
      name: "Accessories",
    },
    {
      name: "Jewelery",
    },
    {
      name: "Documents",
    },
    {
      name: "Devices",
    },
    {
      name: "Others",
    },
  ]
  const createPostsType1 = {
    create: [
      {
        name: "Samsung S21",
        description: "Samsung S21 with a bit issues",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
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
      {
        name: "Bag",
        description: "Bag with my wallet",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 1,
        questions: {
          create: [
            {
              title: "Size of your bag",
              answers: {
                create: [
                  {
                    title: "Big",
                    status: false,
                  },
                  {
                    title: "Medium",
                    status: true,
                  },
                  {
                    title: "Small",
                    status: false,
                  },
                ],
              },
            },
            {
              title: "What color is your bag?",
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
      {
        name: "Dog",
        description: "Haski",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: false,
                  },
                  {
                    title: "Brown",
                    status: true,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Headphones",
        description: "Headphones of my Samsung S10",
        address: "Mergelyan",
        type: "LOST",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Do you Have issues on it",
              answers: {
                create: [
                  {
                    title: "Yes",
                    status: false,
                  },
                  {
                    title: "No",
                    status: true,
                  },
                ],
              },
            },
            {
              title: "What color is your headphones?",
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
      {
        name: "Samsung S21",
        description: "Samsung S21 with a bit issues",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
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
      {
        name: "Bag",
        description: "Bag with my wallet",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 1,
        questions: {
          create: [
            {
              title: "Size of your bag",
              answers: {
                create: [
                  {
                    title: "Big",
                    status: false,
                  },
                  {
                    title: "Medium",
                    status: true,
                  },
                  {
                    title: "Small",
                    status: false,
                  },
                ],
              },
            },
            {
              title: "What color is your bag?",
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
      {
        name: "Dog",
        description: "Haski",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: false,
                  },
                  {
                    title: "Brown",
                    status: true,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Headphones",
        description: "Headphones of my Samsung S10",
        address: "Mergelyan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Do you Have issues on it",
              answers: {
                create: [
                  {
                    title: "Yes",
                    status: false,
                  },
                  {
                    title: "No",
                    status: true,
                  },
                ],
              },
            },
            {
              title: "What color is your headphones?",
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
      {
        name: "Dog",
        description: "Haski",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: false,
                  },
                  {
                    title: "Brown",
                    status: true,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Headphones",
        description: "Headphones of my Samsung S10",
        address: "Mergelyan",
        type: "LOST",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Do you Have issues on it",
              answers: {
                create: [
                  {
                    title: "Yes",
                    status: false,
                  },
                  {
                    title: "No",
                    status: true,
                  },
                ],
              },
            },
            {
              title: "What color is your headphones?",
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
      {
        name: "Samsung S21",
        description: "Samsung S21 with a bit issues",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
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
      {
        name: "Dog",
        description: "Haski",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: false,
                  },
                  {
                    title: "Brown",
                    status: true,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Headphones",
        description: "Headphones of my Samsung S10",
        address: "Mergelyan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Do you Have issues on it",
              answers: {
                create: [
                  {
                    title: "Yes",
                    status: false,
                  },
                  {
                    title: "No",
                    status: true,
                  },
                ],
              },
            },
            {
              title: "What color is your headphones?",
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
      {
        name: "Samsung S21",
        description: "Samsung S21 with a bit issues",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
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
    ],
  }
  const createPostsType2 = {
    create: [
      {
        name: "Iphone 10s",
        description: "Iphone with Liverpool's case",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
                  },
                  {
                    title: "Blue",
                    status: false,
                  },
                ],
              },
            },
            {
              title: "What color is your case?",
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
      {
        name: "Wallet",
        description: "Wallet with my driving license",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Size of your wallet",
              answers: {
                create: [
                  {
                    title: "Big",
                    status: false,
                  },
                  {
                    title: "Medium",
                    status: true,
                  },
                  {
                    title: "Small",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Dog",
        description: "Pit Bull",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: true,
                  },
                  {
                    title: "Brown",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Iphone 10s",
        description: "Iphone with Liverpool's case",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
                  },
                  {
                    title: "Blue",
                    status: false,
                  },
                ],
              },
            },
            {
              title: "What color is your case?",
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
      {
        name: "Headphones",
        description: "Headphones of my Samsung S10",
        address: "Mergelyan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Do you Have issues on it",
              answers: {
                create: [
                  {
                    title: "Yes",
                    status: false,
                  },
                  {
                    title: "No",
                    status: true,
                  },
                ],
              },
            },
            {
              title: "What color is your headphones?",
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
      {
        name: "Dog",
        description: "Pit Bull",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: true,
                  },
                  {
                    title: "Brown",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Iphone 10s",
        description: "Iphone with Liverpool's case",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
                  },
                  {
                    title: "Blue",
                    status: false,
                  },
                ],
              },
            },
            {
              title: "What color is your case?",
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
      {
        name: "Wallet",
        description: "Wallet with my driving license",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Size of your wallet",
              answers: {
                create: [
                  {
                    title: "Big",
                    status: false,
                  },
                  {
                    title: "Medium",
                    status: true,
                  },
                  {
                    title: "Small",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Dog",
        description: "Pit Bull",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: true,
                  },
                  {
                    title: "Brown",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "Iphone 10s",
        description: "Iphone with Liverpool's case",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
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
                    status: true,
                  },
                  {
                    title: "Red",
                    status: false,
                  },
                  {
                    title: "Blue",
                    status: false,
                  },
                ],
              },
            },
            {
              title: "What color is your case?",
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
      {
        name: "Headphones",
        description: "Headphones of my Samsung S10",
        address: "Mergelyan",
        type: "FOUND",
        trusted: true,
        category_id: 5,
        questions: {
          create: [
            {
              title: "Do you Have issues on it",
              answers: {
                create: [
                  {
                    title: "Yes",
                    status: false,
                  },
                  {
                    title: "No",
                    status: true,
                  },
                ],
              },
            },
            {
              title: "What color is your headphones?",
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
      {
        name: "Dog",
        description: "Pit Bull",
        address: "Yerevan",
        type: "LOST",
        trusted: true,
        category_id: 3,
        questions: {
          create: [
            {
              title: "What color is your Dog?",
              answers: {
                create: [
                  {
                    title: "Black",
                    status: true,
                  },
                  {
                    title: "Brown",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }

  const createFinalePosts = {
    create: [
      {
        name: "The Keys",
        description: "Keys with Liverpool's trinket",
        address: "Yerevan",
        type: "FOUND",
        trusted: true,
        category_id: 2,
        questions: {
          create: [
            {
              title: "What color is your trinket?",
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
            {
              title: "How many keys are on it",
              answers: {
                create: [
                  {
                    title: "5",
                    status: true,
                  },
                  {
                    title: "4",
                    status: false,
                  },
                  {
                    title: "3",
                    status: false,
                  },
                  {
                    title: "2",
                    status: false,
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.user.upsert({
    where: { email: "anahit@gmail.com" },
    update: {},
    create: {
      email: "anahit@gmail.com",
      password: await hashPassword("qwerty12"),
      name: "Anahit",
      surname: "Sargsyan",
      phone: "+37493-65-65-65",
      is_verified: true,
      is_admin: true,
      posts: createPostsType1,
    },
  })
  await prisma.user.upsert({
    where: { email: "artyom@gmail.com" },
    update: {},
    create: {
      email: "artyom@gmail.com",
      password: await hashPassword("qwerty12"),
      name: "Artyom",
      surname: "Harutunyan",
      is_verified: true,
      is_admin: true,
      posts: createPostsType2,
    },
  })
  await prisma.user.upsert({
    where: { email: "avetisyanani6@gmail.com" },
    update: {},
    create: {
      email: "avetisyanani6@gmail.com",
      password: await hashPassword("ani12345"),
      name: "Ani",
      surname: "Avetisyan",
      is_verified: true,
      is_admin: true,
      posts: createPostsType2,
    },
  })
  await prisma.user.upsert({
    where: { email: "martin@gmail.com" },
    update: {},
    create: {
      email: "martin@gmail.com",
      password: await hashPassword("qwerty12"),
      name: "Martin",
      surname: "Skrtel",
      is_admin: true,
      is_verified: true,
      posts: createFinalePosts,
    },
  })

  for (const message of messages) {
    await prisma.message.create({
      data: {
        text: message,
        from_id: 1,
        to_id: 2,
      },
    })
    await prisma.message.create({
      data: {
        text: message,
        from_id: 2,
        to_id: 1,
      },
    })
    await prisma.message.create({
      data: {
        text: message,
        from_id: 4,
        to_id: 1,
      },
    })
    await prisma.message.create({
      data: {
        text: message,
        from_id: 4,
        to_id: 2,
      },
    })
    await prisma.message.create({
      data: {
        text: message,
        from_id: 4,
        to_id: 3,
      },
    })
  }

  for (const question of faq) {
    await prisma.faq.create({
      data: question,
    })
  }

  await prisma.favorite.createMany({
    data: [
      {
        user_id: 1,
        post_id: 1,
      },
      {
        user_id: 1,
        post_id: 2,
      },
      {
        user_id: 2,
        post_id: 1,
      },
      {
        user_id: 2,
        post_id: 3,
      },
      {
        user_id: 4,
        post_id: 1,
      },
      {
        user_id: 4,
        post_id: 2,
      },
      {
        user_id: 4,
        post_id: 8,
      },
      {
        user_id: 4,
        post_id: 9,
      },
    ],
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
