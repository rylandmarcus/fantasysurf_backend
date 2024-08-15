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
const adminController = require('./controllers/adminController')
const ctController = require('./controllers/ctStatsController')
const leagueController = require('./controllers/leagueController')
const cookieParser = require('cookie-parser')
const User = require('./models/user')
const Event = require('./models/event')

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}

//MIDDLEWARE
app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//ROUTES
app.get('/', (req, res)=>{
    res.send('Hello World')
})
//test

// app.get('/bob', async (req, res)=>{
//     let events  = await Event.find({})
//     for (const event of events){
//         await event.populate({path:'surfers', select:'name rank'})
//     }
//     res.send(events)
// })

//AUTH ROUTES
app.use('/auth', authController)

//ROUTE PROTECTION
app.use((req, res, next)=>{
    const token = req.cookies.token
    if (!token){
        res.status(401).json({Status: 'Error', message: 'unauthorized'})
    } else {
        try {
            const decoded = jwt.verify(token, secret)
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({Status: 'Error', message: 'unauthorized'})
        }
    }
})

//VERIFY ROUTE
app.get('/verify', async (req, res)=>{
    console.log(req.user._id)
    const user = await User.findById(req.user._id)
    if (user.username === 'admin'){
        console.log('admin')
        res.json({Status: 'Success', admin: true})
    } else {
        res.json({Status: 'Success'})
    }
    // res.json({Status: 'Success', message: 'authorized'})
})

//AUTHORIZED ROUTES
app.use('/ct', ctController)
app.use('/leagues', leagueController)

app.get('/myhome', async (req, res)=>{
    const user = await User.findById(req.user._id)
    res.json(user)
})

app.get('/locked', (req, res)=>{
    res.json('secret stuff')
})

//ADMIN VERIFICATION
app.use(async (req, res, next)=>{
    const user = await User.findById(req.user._id)
    if (user.username === 'admin'){
        next()
    } else {
        res.status(401).json({Status: 'Error', message: 'unauthorized'})
    }
})

//ADMIN ROUTES
app.use('/admin', adminController)

//LISTENER
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
