const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
require('dotenv').config()

connectDB()
const app = express()

const PORT = process.env.PORT


app.listen(PORT, ()=> console.log('listening on port', PORT))


