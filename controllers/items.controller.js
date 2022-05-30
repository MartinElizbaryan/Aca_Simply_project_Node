const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findAll = async function (req, res) {
  const users = await prisma.item.findMany({
    include: {
      user: true
    },
    where: {
      completed: false,
      trusted: true
    }
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

exports.update = async function (req, res) {
  const {name, description, img, address} = req.body;
  await prisma.item.update({
    data: {
      name,
      description,
      img,
      address,
    },
    where: {
      id: +req.params.id
    }
  });

  res.send("Updated");

}

exports.confirmed = async function (req, res) {
  await prisma.item.update({
    data: {
      confirmer_id: 1
    },
    where: {
      id: +req.params.id
    }
  })

  res.send(`confirmer id=${req.params.id}`)
}

exports.deleteConfirmed = async function (req, res) {
  await prisma.item.update({
    data: {
      confirmer_id: null
    },
    where: {
      id: +req.params.id
    }
  })

  res.send(`confirmer id=null`)
}

exports.completed = async function (req, res) {
  await prisma.item.update({
    data: {
      completed: true
    },
    where: {
      id: +req.params.id
    }
  })

  res.send(`completed id=${req.params.id}`)
}


exports.delete = async function (req, res) {
  await prisma.item.delete({
    where: {
      id: +req.params.id
    }
  })
}