const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const courseSchema = Schema({
  name: {
    type: String,
    default: 'None'
  },
  code: {
    type: String,
    unique: true,
    default: 'None'
  },
  credits: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'None'
  },
  type: {
    type: String,
    default: 'None'
  },
  offered: {
    type: String,
    default: 'None'
  },
  lecturer: {
    type: String,
    default: 'None'
  },
  block: {
    type: Number,
    default: 1
  }
})

courseSchema.plugin(uniqueValidator)

module.exports = model('Course', courseSchema)