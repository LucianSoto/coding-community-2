const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
require('dotenv').config()

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/posts', require('./routes/postRoutes'))

app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, ()=> console.log('listening on port', PORT))


