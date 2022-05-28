const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findAll = async function (req, res) {
  const users = await prisma.item.findMany({
    include: {
      user: true
    },
  });
  res.send(users);
}

exports.create = async function (req, res) {
  const {user_id, name, description, img, address, type} = req.body;
  // try{
    const newItem = await prisma.item.create({
      data: {
        user_id,
        name,
        description,
        img,
        address,
        type
      }
    });
    console.log("newItem ------ ", newItem)
  // } catch (e) {
  //   res.send(e)
  // }
}

exports.find = async function (req, res) {
  const item = await prisma.item.findFirst({
    where: {
      id: +req.params.id
    },
    include: {
      user: true
    }
  })
  res.send(item)
}

// exports.update = async function (req, res) {
//   const {name, description, img, address, type} = req.body;
//   await prisma.item.update({
//     data: {
//       name,
//       description,
//       img,
//       address,
//       type
//     },
//     where: {
//       id: +req.params.id
//     }
//   });
//
//   res.send("Updated");
//
// }

// exports.completed = async function (req, res) {
//   await prisma.item.updateMany({
//     data: {
//       completed: true
//     },
//     where: {
//       id: +req.params.id
//     }
//   })
//
//   res.send(`completed id=${req.params.id}`)
//
// }

exports.delete = async function (req, res) {
  await prisma.item.delete({
    where: {
      id: +req.params.id
    }
  })
}