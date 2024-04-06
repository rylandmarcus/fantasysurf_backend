require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
//io server setup? for live drafting
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT
const secret = process.env.SECRET
const jwt = require('jsonwebtoken')
const authController = require('./controllers/authController')
const cookieParser = require('cookie-parser')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.use('/auth', authController)

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
