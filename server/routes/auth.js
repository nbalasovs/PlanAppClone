const {Router} = require('express')
const {validateAuth} = require('./utilities/utilities')
const {generateJWT} = require('../auth-services')
const User = require('../models/user')
const router = Router()

router.post('/auth', (req, res) => {
  const validation = validateAuth(req.body)
  if(!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }

  User.findOne({ username: req.body.username.toLowerCase() }, (error, user) => {
    if (error) return res.status(500).json()
    if (!user) return res.status(401).json()
    const passwordsMatch = User.passwordMatches(req.body.password, user.password)
    if (!passwordsMatch) return res.status(401).json()
    return res.status(200).json({ token: generateJWT(user) })
  })
})

module.exports = router