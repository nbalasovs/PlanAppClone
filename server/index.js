const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

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
app.use('/api/course', require('./routes/data'))
app.use('/api', require('./routes/register'))
app.use('/api', require('./routes/auth'))
app.use('/api/course', require('./routes/courses'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

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



