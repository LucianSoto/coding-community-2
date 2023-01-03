const path = require('path')
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler)

app.listen(PORT, ()=> console.log('listening on port', PORT))


