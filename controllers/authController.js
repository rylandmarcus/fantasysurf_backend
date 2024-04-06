require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)

router.get('/', (req, res)=>{
    res.send('Hello from auth route!')
})

router.post('/login', async (req, res)=>{
    const userToLogin = await User.findOne({username: req.body.username})
    if (userToLogin){
        bcrypt.compare(req.body.password, userToLogin.password, (err, result)=>{
            if (result){
                const token = jwt.sign({username: req.body.username}, 'keyboard', {expiresIn: '1h'});
                res.cookie('token', token, {httpOnly: true}).json({Status: 'Success'})
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

})

module.exports = router