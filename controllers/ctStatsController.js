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

//SHOW

module.exports = router