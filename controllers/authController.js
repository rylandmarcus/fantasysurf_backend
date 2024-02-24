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

router.post('/login', (req, res)=>{

})

router.post('/signup', async (req, res)=>{
    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword)=>{
        const createdUser = await User.create({...req.body, password: hashedPassword})
        res.json(createdUser)
    })
})

router.get('/logout', (req, res)=>{

})

module.exports = router