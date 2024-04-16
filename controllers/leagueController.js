const express = require('express')
const router = express.Router()
const League = require('../models/league')
const Event = require('../models/event')

// router.get('/myleagues', async (req, res)=>{
//     //find all leagues that the user is included in and the league is not complete
//     const leagues = await League.find({users: req.user._id, completed: false})
//     for (const team of leagues.teams){
//         await league.populate('team')
//     }
//     res.json(leagues)
// })


router.post('/new', async (req, res)=>{
    const currentEvent = await Event.findOne({eventNumber: 5})
    //or ^ maybe if you have to load events on frontend for the choices, send over the ID
    // const currentEvent = await Event.findOne({eventNumber: req.body.eventNumber})
    let league = req.body
    league.event = currentEvent._id
    league.users = [req.user._id]
    league.leagueLength = 'single'
    league.leagueType = 'snake'
    console.log(league)
    // ALSO CHECK for if league name is already taken
    const newLeague = await League.create(league)
    res.json(newLeague)
})




module.exports = router