import http from "http"
import { Server } from "socket.io"
import app from "./app.js"
import * as routes from "./api/index.js"
import { job } from "./services/cron.js"
import {
  addInOnlineUsers,
  deleteSocketId,
  getOnlineUsersId,
  sendEventViaSocketId,
} from "./helpers/socketHelpers.js"
import { internalServerErrorCreator, notFoundErrorCreator } from "./helpers/errors.js"

const PORT = app.get("port")
const { API_VERSIONS } = app.get("config")

API_VERSIONS.forEach((version) => app.use(`/api/${version}`, routes[version]))

// handle 404 error
app.use((req, res, next) => {
  next(notFoundErrorCreator())
})

// handle errors
app.use((err, req, res, next) => {
  console.log(err)
  const error = err.status ? err : internalServerErrorCreator()
  const status = err.status || 500
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

const getOnlineUsersId = () => {
  return Object.keys(users).map((id) => +id)
}

const getIdViaSocketId = (socketId) => {
  return Object.keys(users).find((id) => {
    return users[id].includes(socketId)
  })
}

export const sendEventViaSocketId = (socketId, event, data = {}) => {
  const userId = getIdViaSocketId(socketId)
  sendEventViaUserId(userId, event, data)
}

export const sendEventViaSocketIdExpectCurrent = (socketId, event, data = {}) => {
  const userId = getIdViaSocketId(socketId)
  const socketIdsExpectCurrent = users[userId].filter((sId) => {
    return sId !== socketId
  })
  // console.log(socketIdsExpectCurrent, event)
  io.to(socketIdsExpectCurrent).emit(event, data)
}

export const sendEventViaUserId = (userId, event, data = {}) => {
  users[userId]?.forEach((sId) => {
    io.to(sId).emit(event, data)
  })
}

io.on("connection", (socket) => {
  socket.on("connect-success", ({ userId }) => {
    addInOnlineUsers(userId, socket.id)

    socket.on("send", ({ data }) => {
      sendEventViaUserId(data.to_id, "receive", data)
      sendEventViaUserId(data.to_id, "playNotificationSound")
      sendEventViaUserId(data.to_id, "chatUsersUpdate")
      sendEventViaUserId(data.to_id, "messageCountUpdate")
      sendEventViaSocketId(socket.id, "chatUsersUpdate")
    })

    socket.on("getOnlineUsers", () => {
      sendEventViaSocketId(socket.id, "onlineUsers", getOnlineUsersId())
    })

    socket.on("messageIsSeen", ({ to_id: toId }) => {
      sendEventViaSocketId(socket.id, "chatUsersUpdate")
      sendEventViaSocketId(socket.id, "messageCountUpdate")
      sendEventViaUserId(toId, "seenMessages")
      sendEventViaSocketId(socket.id, "seenMessages")
    })

    // all users
    io.emit("onlineUsers", getOnlineUsersId())
  })

  socket.on("disconnect", () => {
    deleteSocketId(socket.id)
    // All users expect me
    socket.broadcast.emit("onlineUsers", getOnlineUsersId())
  })
})

server.listen(PORT, function () {
  console.log(`\n🚀 Server ready at: http://localhost:${this.address().port}\n`)
})

job.start()
