const jwt = require('jsonwebtoken')

exports.generateJWT = (user) => {
  const data = {
    username: user.username,
    isAdmin: user.isAdmin,
    id: user._id
  }
  return jwt.sign({ user: data }, process.env.SECRET)
}

exports.requireLogin = (req, res, next) => {
  const token = this.decodeToken(req)
  if(!token) return res.status(401).json({ message: "You must be logged in." })
  next()
}

exports.decodeToken = (req) => {
  const token = req.headers.authorization || req.headers['authorization']

  if(!token) return null

  try {
    return jwt.verify(token, process.env.SECRET)
  } catch(e) {
    console.log(e)
    return null
  }
}

exports.getUsername = (req) => {
  const token = this.decodeToken(req)
  if (!token) return null
  return token.user.username
}

exports.getUserId = (req) => {
  const token = this.decodeToken(req)
  if(!token) return null
  return token.user.id
}