const express = require('express')
const router = express.Router()
const Surfer = require('../models/surfer')
const Event = require('../models/event')

router.get('/', (req, res)=>{
    res.json('Hello from admin route!')
})

//INDEX
router.get('/surfers', async (req, res)=>{
    const surfers = await Surfer.find({})
    res.json(surfers)
})

router.get('/events', async (req, res)=>{
    const events = await Event.find({})
    res.json(events)
})

//DELETE
//UPDATE
//CREATE
router.post('/surfers', async (req, res)=>{
    const surfer = await Surfer.create(req.body)
    res.json(surfer)
})

router.post('/events', async (req, res)=>{
    const event = await Event.create(req.body)
    res.json(event)
})

//SHOW


module.exports = router