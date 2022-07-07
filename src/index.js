import app from "./app.js"
import http from "http"
import { Server } from "socket.io"

import * as routes from "./api/index.js"
import { internalServerErrorCreator, notFoundErrorCreator } from "./helpers/errors.js"

const PORT = app.get("port")
const { API_VERSIONS } = app.get("config")

API_VERSIONS.forEach((version) => app.use(`/api/${version}`, routes[version]))

// handle 404 error
app.use((req, res, next) => {
  console.log(req.url)
  next(notFoundErrorCreator())
})

// handle errors
// eslint-disable-next-line
app.use((err, req, res, next) => {
  console.log(err)
  const error = err.status ? err : internalServerErrorCreator()
  const status = err.status || 500
  console.log(error.stack)

  res.status(status).json(error)
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
})

const users = {}

function getOnlineUsersId() {
  return Object.keys(users).map((id) => +id)
}

function getIdBySocketId(socketId) {
  for (const userId in users) {
    if (users[userId] === socketId) return userId
  }
}

io.on("connection", (socket /*, esiminch*/) => {
  // console.log("esiminch", esiminch)

  socket.on("connect-success", ({ userId }) => {
    console.log("userId", userId)
    console.log("socket.id", socket.id)
    users[userId] = socket.id

    socket.on("send", ({ data }) => {
      // users via socket id
      io.to(users[data.to_id]).emit("receive", data)
      io.to(users[data.to_id]).emit("seen")
      io.to(users[data.to_id]).emit("messageCountUpdate")
    })

    socket.on("getOnlineUsers", () => {
      io.to(socket.id).emit("onlineUsers", getOnlineUsersId(users))
    })

    socket.on("messageIsSeen", () => {
      io.to(socket.id).emit("seen")
      io.to(socket.id).emit("messageCountUpdate")
      io.to(socket.id).emit("seenMessages")
    })

    // all users
    io.emit("onlineUsers", getOnlineUsersId(users))
  })

  socket.on("disconnect", () => {
    console.log("looooooooooooooooooooooooooooooogout")
    delete users[getIdBySocketId(socket.id)]
    // All users expect me
    socket.broadcast.emit("onlineUsers", getOnlineUsersId())
  })

  // socket.on("join", ({ room, authId }) => {
  //   socket.join(room)
  //   users[socket.id] = authId
  //
  //   const usersArray = getOnlineUsersId()
  //
  //   socket.broadcast.emit("onlineUsers", usersArray)
  //   io.to(socket.id).emit("onlineUsers", usersArray)
  //
  //   console.log("User joined", socket.id, room)
  // })
  // socket.on("messageDone", ({ room }) => {
  //   console.log(room, "room")
  //   console.log("messageDOne")
  //   io.sockets.emit("messageAdded")
  // })

  // socket.on("leave", (room) => {
  //   socket.leave(room)
  //   console.log("User left", socket.id, room)
  // })
})

server.listen(PORT, function () {
  console.log(`\n🚀 Server ready at: http://localhost:${this.address().port}\n`)
})
