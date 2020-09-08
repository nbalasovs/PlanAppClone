const {Router} = require('express')
const router = Router()
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

router.get('/grid/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) console.log(err)
    return res.status(200).json(data.grid)
  })
})

module.exports = router