const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



exports.find = async function (req, res) {
  const id = +req.params.id;
  const user = await prisma.user.findFirst({
    include: {
      items: true,
      confirmedItems: true
    },
    where: {
      id
    }
  })
  res.send(user);
}

exports.findWithMessages = async function (req, res) {
  const id = +req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id
    },
    select: {
      name: true,
      surname: true,
      messages_from: {
        where: {
          to_id: 2 // should be auth id
        },
      },
      messages_to: {
        where: {
          from_id: 2 // should be auth id
        },
      },
    },
  })
  res.send(user);
}

exports.update = async function (req, res) {
  const {name, surname, phone} = req.body;

  await prisma.user.update({
    data: {
      name,
      surname,
      phone
    },
    where: {
      id: +req.params.id
    }
  });

  res.send("Updated");

}

exports.addMoney = async function (req, res) {
  const {money} = req.body;

  await prisma.user.update({
    data: {
      money: {
        increment: money
      }
    },
    where: {
      id: +req.params.id
    }
  });

  res.send("Updated");

}
