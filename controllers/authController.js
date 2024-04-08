require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)
const secret = process.env.SECRET

router.get('/', (req, res)=>{
    res.send('Hello from auth route!')
})

router.post('/login', async (req, res)=>{
    const userToLogin = await User.findOne({username: req.body.username})
    if (userToLogin){
        bcrypt.compare(req.body.password, userToLogin.password, (err, result)=>{
            if (result){
                if (userToLogin.username === 'admin'){
                    const token = jwt.sign({_id: userToLogin._id}, secret, {expiresIn: '1h'});
                    console.log('admin lgo in')
                    res.cookie('token', token, {httpOnly: true}).json({Status: 'Success', admin: true})
                } else {
                    const token = jwt.sign({_id: userToLogin._id}, secret, {expiresIn: '1h'});
                    res.cookie('token', token, {httpOnly: true}).json({Status: 'Success'})
                }
            } else if (err) {
                res.status(400).json({Status: 'Error', message: 'incorrect username or password'})
            } else {
                res.status(400).json({Status: 'Error', message: 'incorrect username or password'})
            }
        })
    } else {
        res.status(400).json({Status: 'Error', message: 'incorrect username or password'})
    }
})

router.post('/signup', async (req, res)=>{
    console.log(req.body.username, req.body.password)
    const existingUser = await User.findOne({username: req.body.username})
    if (existingUser){
        res.status(400).json({Status: 'Error', message: 'exists'})
    } else {
        bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword)=>{
            const createdUser = await User.create({...req.body, password: hashedPassword})
            res.json(createdUser)
        })
    }
})

router.get('/logout', (req, res)=>{
    res.clearCookie('token').json({Status: 'Logged Out'})
})

module.exports = router