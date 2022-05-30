const { PrismaClient } = require("@prisma/client");
const Joi = require('joi');
const prisma = new PrismaClient();
const schema = Joi.string().required()
exports.findAll = async function (req, res) {
    const messages = await prisma.message.findMany({
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
    res.send(messages);
}

exports.create = async function (req, res) {
    try{
        const message = await schema.validateAsync(req.body.message)
    } catch(err){
        console.log(err.message)
    }
    // console.log(value)
  // try{
    
    //     data: {
    //         message,
    //         from_id:2,
    //         to_id:3
    //     }
    // });
    // res.send(newMessage)
    // console.log("newMessage ------ ", newMessage)
  // } catch (e) {
  //   res.send(e)
  // }
}
