const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const { validateIndex } = require('./utilities/utilities')
const { decodeToken } = require('../auth-services')

router.post('/register', (req, res) => {
  const validation = validateIndex(req.body)
  const validateAdmin = decodeToken(req)

  if(!validation.isValid) {
    return res.status(400).json({ message: validation.message })
  }

  if(!validateAdmin.user.isAdmin) {
    return res.status(403).json({ message: 'You don\'t have sufficient permission to register users'})
  }

  const user = new User({
    first: req.body.first,
    last: req.body.last,
    username: req.body.username,
    password: req.body.password
  })

  user.save((err) => {
    if(err) {
      if(err.errors.username.kind === 'unique') {
        return res.status(403).json({ message: 'Username is already taken' })
      }
      return res.status(500).json()
    }
    return res.status(201).json({ message: 'Account successfuly created' })
  })
})

module.exports = router