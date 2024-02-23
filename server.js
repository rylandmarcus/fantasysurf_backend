require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
//io server setup? for live drafting
const cors = require('cors')
const moragn = require('morgan')
const PORT = process.env.PORT
const secret = process.env.SECRET

app.get('/', (req, res)=>{
    res.send('Hello World')
})

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
