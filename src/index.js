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
const io = new Server(server)

io.on("connection", (socket) => {
  console.log("User", socket.id)
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id)
  })
})

server.listen(PORT, function () {
  console.log(`\n🚀 Server ready at: http://localhost:${this.address().port}\n`)
})
