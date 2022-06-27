export const notFoundErrorCreator = (details) => {
  const error = new Error("Not Found")
  error.status = 404
  error.details = details

  return error
}

export const internalServerErrorCreator = () => {
  const error = new Error("Internal server error")
  error.status = 500

  return error
}

export const badRequestErrorCreator = (details) => {
  const error = new Error("Bad Request")
  error.status = 400
  error.details = details

  return error
}

export const unauthorizedErrorCreator = (details) => {
  const error = new Error("Unauthorized")
  error.status = 401
  error.details = details

  return error
}

export const forbiddenErrorCreator = (details) => {
  const error = new Error("Forbidden")
  error.status = 403
  error.details = details

  return error
}
