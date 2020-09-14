const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const userSchema = Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type:  Boolean,
    default: false
  },
  list: {
    items: [{
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
      },
      isPassed: {
        type: Boolean,
        default: false
      },
      grade: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
      }
    }],
  },
  grid: {
    years: [{
      state: [{
        isPassed: Boolean,
        courseCode: String,
        x: Number,
        y: Number,
        w: Number,
        h: Number,
        i: String,
        c: String
      }]
    }]
  },
  startYear: {
    type: Number,
    min: 2000,
    max: new Date().getFullYear()
  }
})

userSchema.set('timestamps', true)
userSchema.plugin(uniqueValidator)

userSchema.statics.passwordMatches = function(password, hash) {
  return bcrypt.compareSync(password, hash);
}

userSchema.pre('save', function(next) {
  this.first = this.first.toLowerCase()
  this.last = this.last.toLowerCase()
  this.username = this.username.toLowerCase()
  this.password = bcrypt.hashSync(this.password, 10 )
  next()
})

module.exports = model('User', userSchema)