import fs from "fs"
import path from "path"
import cors from "cors"
import logger from "morgan"
import express from "express"
import cookieParser from "cookie-parser"
import { verifyToken } from "./helpers/authHelpers.js"

const app = express()

const env = process.env.NODE_ENV || "development"
const configStr = fs.readFileSync(path.resolve("src/config.json"), "utf-8")
const config = JSON.parse(configStr)[env]

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
)

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  const payload = verifyToken(token)
  if (payload) {
    const { id, is_admin } = payload
    req.auth = { id, is_admin }
  }
  next()
})

app.use(logger("dev" /*, { skip: (req, res) => res.statusCode < 400 }*/))

app.set("port", process.env.PORT)
app.set("env", env)
app.set("config", config)

export default app
