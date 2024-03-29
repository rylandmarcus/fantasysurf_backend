require('dotenv').config()
const mongoose = require('mongoose')
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection.on('connected', ()=>{
    console.log('we are onnected to MongoDB')
})

mongoose.connection.on('error', (error)=>{
    console.log(`MongoDB error: ${error}`)
})

module.exports = mongoose