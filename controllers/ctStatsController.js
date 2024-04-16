const express = require('express')
const router = express.Router()
const Surfer = require('../models/surfer')
const Event = require('../models/event')

//INDEX
router.get('/events', async (req, res)=>{
    let events = await Event.find({})
    for (const event of events){
        await event.populate('surfers')
    }
    res.json(events)
})

router.get('/rankings', async (req, res)=>{
    let surfers = await Surfer.find({rank:{ $ne: 0 }}).sort({rank:1})
    res.json(surfers)
})

//SHOW

module.exports = router