import { forbiddenErrorCreator } from "../helpers/errors.js"

export default async (req, res, next) => {
  const { is_admin } = req.auth
  if (is_admin) return next()
  else next(forbiddenErrorCreator("You don't have permission to access this resource."))
}
