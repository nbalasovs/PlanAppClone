const {Router} = require('express')
const router = Router()
const Scrapper = require('../utils/scrapper')
const Course = require('../models/course')
const User = require('../models/user')
const mongoose = require('mongoose')

function saveCourse(userId, isPassed, grade, course) {
  User.findById(userId, (err, data) => {
    if(err) return res.status(500).json({ error: err })
    const items = data.list.items
    const idx = items.findIndex(c => {
      return c.courseId.toString() === course._id.toString()
    })
    
    if(idx == -1) {
      items.push({
        courseId: mongoose.Types.ObjectId(course._id),
        isPassed: JSON.parse(isPassed),
        grade: grade
      })
      User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId) }, { list: { items: items } }, { new: true }, err => err)
    } else {
      return
    }
  })
}

router.post('/add', async (req, res) => {
  const info = await Scrapper.requestResource(req.body.id)
  const courseId = req.body.id.toUpperCase()
  
  if(!Object.keys(info).length == 0) {
    const course = new Course({
      code: courseId,
      name: info[0],
      credits: info[1],
      category: info[2],
      type: info[3],
      offered: info[4],
      lecturer: info[5],
      block: info[6]
    })

    course.save((err) => {
      if(err) {
        if(err.errors.code.kind === 'unique') {
          Course.findOne({ code: courseId }, (err, data) => {
            if(err) return res.status(500).json({ error: err })
            saveCourse(mongoose.Types.ObjectId(req.body.userId), req.body.isPassed, req.body.grade, data)
          })
          return res.status(201).json({ message: 'This course was already in the database!' })
        }
        return res.status(500).json()
      }
      saveCourse(mongoose.Types.ObjectId(req.body.userId), req.body.isPassed, req.body.grade, course)
      return res.status(201).json()
    })
  } else {
    return res.status(404).json({ message: "Sorry, we could not find a course with such code" })
  }
})

router.post('/remove', (req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.userId), (err, data) => {
    if(err) return res.status(500).json({ error: err })
    const items = data.list.items
    const years = data.grid.years
    var idx = -1
    const itemsSubset = items.filter(el => String(el.courseId) !== String(req.body.courseId))

    User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.userId) }, 
      { list: { items: itemsSubset } },
      { new: true },
      err => err
    )
    
    for (const [i, year] of years.entries()) {
      idx = year.state.findIndex(el => String(el.i) === String(req.body.courseId))
      if(idx !== -1) idx = i; break
    }

    if(idx !== -1) {
      const state = data.grid.years[idx].state
      const stateSubset = state.filter(el => String(el.i) !== String(req.body.courseId))

      years[idx].state = stateSubset

      User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.userId) },
        { grid: { years: years } },
        { new: true },
        err => err
      )
    }

    return res.status(200).json({ message: `Course with id ${req.body.courseId} was removed` })
  })
})

router.get('/:id', (req, res) => {
  Course.findOne({ code: req.params.id.toUpperCase() }, (err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})

module.exports = router