import app from "./app.js"
import http from "http"
import { Server } from "socket.io"

import * as routes from "./api/index.js"
import { internalServerErrorCreator, notFoundErrorCreator } from "./helpers/errors.js"
import { job } from "./services/cron.js"

const PORT = app.get("port")
const { API_VERSIONS } = app.get("config")

API_VERSIONS.forEach((version) => app.use(`/api/${version}`, routes[version]))

// handle 404 error
app.use((req, res, next) => {
  console.log(req.url)
  next(notFoundErrorCreator())
})

// handle errors
app.use((err, req, res, next) => {
  console.log(err)
  const error = err.status ? err : internalServerErrorCreator()
  const status = err.status || 500
  console.log(error.stack)

  res.status(status).json(error)
})

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
})

export const users = {}

function getOnlineUsersId() {
  return Object.keys(users).map((id) => +id)
}

// function getIdBySocketId(socketId) {
//   for (const userId in users) {
//     if (users[userId] === socketId) return userId
//   }
// }

function sendEvent(socketArr, eventName) {
  // socketArr.forEach((socketId) => {})
}

const addInOnlineUsers = (userId, socketId) => {
  if (users[userId]) {
    users[userId].push(socketId)
  } else {
    users[userId] = [socketId]
  }
}

io.on("connection", (socket) => {
  socket.on("connect-success", ({ userId }) => {
    console.log("userId", userId)
    console.log("socket.id", socket.id)

    addInOnlineUsers(userId, socket.id)

    socket.on("send", ({ data }) => {
      // users via socket id
      io.to(users[data.to_id]).emit("receive", data)
      io.to(users[data.to_id]).emit("chatUsersUpdate")
      io.to(socket.id).emit("chatUsersUpdate")
      io.to(users[data.to_id]).emit("messageCountUpdate")
    })

    socket.on("getOnlineUsers", () => {
      io.to(socket.id).emit("onlineUsers", getOnlineUsersId(users))
    })

    socket.on("messageIsSeen", ({ to_id: toId }) => {
      io.to(socket.id).emit("chatUsersUpdate")
      io.to(socket.id).emit("messageCountUpdate")
      io.to(users[toId]).emit("seenMessages")
      io.to(socket.id).emit("seenMessages")
    })

    // all users
    io.emit("onlineUsers", getOnlineUsersId(users))
  })

  socket.on("disconnect", () => {
    console.log("logout")
    delete users[getIdBySocketId(socket.id)]
    // All users expect me
    socket.broadcast.emit("onlineUsers", getOnlineUsersId())
  })
})

// io.on("connection", (socket) => {
//   socket.on("connect-success", ({ userId }) => {
//     console.log("userId", userId)
//     console.log("socket.id", socket.id)
//     users[userId] = socket.id
//
//     socket.on("send", ({ data }) => {
//       // users via socket id
//       io.to(users[data.to_id]).emit("receive", data)
//       io.to(users[data.to_id]).emit("chatUsersUpdate")
//       io.to(socket.id).emit("chatUsersUpdate")
//       io.to(users[data.to_id]).emit("messageCountUpdate")
//     })
//
//     socket.on("getOnlineUsers", () => {
//       io.to(socket.id).emit("onlineUsers", getOnlineUsersId(users))
//     })
//
//     socket.on("messageIsSeen", ({ to_id: toId }) => {
//       io.to(socket.id).emit("chatUsersUpdate")
//       io.to(socket.id).emit("messageCountUpdate")
//       io.to(users[toId]).emit("seenMessages")
//       io.to(socket.id).emit("seenMessages")
//     })
//
//     // all users
//     io.emit("onlineUsers", getOnlineUsersId(users))
//   })
//
//   socket.on("disconnect", () => {
//     console.log("logout")
//     delete users[getIdBySocketId(socket.id)]
//     // All users expect me
//     socket.broadcast.emit("onlineUsers", getOnlineUsersId())
//   })
// })

server.listen(PORT, function () {
  console.log(`\n🚀 Server ready at: http://localhost:${this.address().port}\n`)
})
job.start()
