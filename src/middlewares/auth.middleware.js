import { unauthorizedErrorCreator } from "../helpers/errors.js"

export default async (req, res, next) => {
  console.log("Called auth middleware")
  if (req.auth) next()
  else next(unauthorizedErrorCreator("Unauthorized"))
}
