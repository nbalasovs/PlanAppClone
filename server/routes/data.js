const {Router} = require('express')
const router = Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Course = require('../models/course')

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) console.log(err)
    const spec = data.list.items
    const ids = data.list.items.map((el) => {
      return el.courseId
    })
    Course.find({ _id: {$in: ids} }, (err, data) => {
      if(err) res.status(500).json(err)
      let arr = Array()
      for(let i = 0; i < data.length; i++) {
        arr.push({
          data: data[i],
          spec: spec[i]
        })
      }
      res.status(200).json(arr)
    })
  })
})

router.post('/grid/save', (req, res) => {
  const years = req.body.yearsObj
  if(years.length < 5) {
    User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.userId) },
      { grid: { years: years } },
      { new: true },
      err => err
    )
    return res.status(200).json()
  }
  return res.status(304).json('Maximum amount of years was exceeded')
})

router.get('/grid/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) console.log(err)
    return res.status(200).json(data.grid)
  })
})

module.exports = router