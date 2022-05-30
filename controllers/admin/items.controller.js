const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.trusted = async function (req, res) {
    await prisma.item.update({
      data: {
        trusted: true
      },
      where: {
        id: +req.params.id
      }
    })
  
    res.send(`trusted id=${req.params.id}`)
  
  }