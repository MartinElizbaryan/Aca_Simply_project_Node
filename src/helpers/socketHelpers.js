import { sendEventViaUserId, users } from "../index.js"

export const getOnlineUsersId = () => {
  return Object.keys(users).map((id) => +id)
}

export const getIdViaSocketId = (socketId) => {
  return Object.keys(users).find((id) => {
    return users[id].includes(socketId)
  })
}

export const sendEventViaSocketId = (socketId, event, data = {}) => {
  const userId = getIdViaSocketId(socketId)
  sendEventViaUserId(userId, event, data)
}

export const deleteSocketId = (socketId) => {
  Object.keys(users).forEach((id) => {
    users[id].forEach((idSocket, socketIndex) => {
      if (idSocket === socketId) {
        users[id].splice(socketIndex, 1)
      }
    })
    if (users[id].length === 0) delete users[id]
  })
}

export const addInOnlineUsers = (userId, socketId) => {
  if (users[userId]) {
    users[userId].push(socketId)
  } else {
    users[userId] = [socketId]
  }
  users[userId] = [...new Set(users[userId])]
}
