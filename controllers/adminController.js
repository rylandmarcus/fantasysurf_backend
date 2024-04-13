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
    // for (const event of events){
    //     await event.populate('surfers')
    // }
    res.json(events)
})

//DELETE
//UPDATE
router.put('/surfers/:id', async (req, res)=>{
    const surfer = await Surfer.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(surfer)
})
router.put('/rankchange/:id', async (req, res)=>{
    const surfer = await Surfer.findByIdAndUpdate(req.params.id, {rank:req.body.rank}, {new:true})
    res.json(surfer)
})
router.put('/updatescores/:id', async (req, res)=>{
    const event = await Event.findByIdAndUpdate(req.params.id, {scores:req.body.scores}, {new:true})
    res.json(event)
})

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
router.get('/events/:id', async (req, res)=>{
    const event = await Event.findById(req.params.id)
    await event.populate('surfers')
    res.json(event)
})

router.get('/surfers/:id', async (req, res)=>{
    const surfer = await Surfer.findById(req.params.id)
    res.json(surfer)
})

module.exports = router