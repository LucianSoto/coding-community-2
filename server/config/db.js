const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.ATLAS_URI)

    console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB