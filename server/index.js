require('dotenv').config({ path: './server/.env' })

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/data', require('./routes/data'))
app.use('/api', require('./routes/register'))
app.use('/api', require('./routes/auth'))
app.use('/api/course', require('./routes/courses'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if(err) throw err
  console.log('Database is connected')
  app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`)
  })
})



