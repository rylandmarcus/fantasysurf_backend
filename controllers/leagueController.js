const express = require('express')
const router = express.Router()
const League = require('../models/league')
const Event = require('../models/event')
const Team = require('../models/team')

router.get('/myleagues', async (req, res)=>{
    //find all leagues that the user is included in and the league is not complete
    const leagues = await League.find({users: req.user._id, completed: false})
    for (const league of leagues){
        // for (const team of league.teams){
            await league.populate('teams')
        // }
    }
    console.log(leagues)
    res.json(leagues)
})


router.post('/new', async (req, res)=>{
    const currentEvent = await Event.findOne({eventNumber: 5})
    //or ^ maybe if you have to load events on frontend for the choices, send over the ID
    // const currentEvent = await Event.findOne({eventNumber: req.body.eventNumber})
    let league = req.body
    league.event = currentEvent._id
    league.users = [req.user._id]
    league.leagueLength = 'single'
    league.leagueType = 'snake'
    league.leagueSize = 4
    const newTeam = await Team.create({name: req.body.teamName})
    league.teams = [newTeam._id]
    //^ this will only be relevant for certain types of leagues
    console.log(league)
    // ALSO CHECK for if league name is already taken
    const newLeague = await League.create(league)
    res.json(newLeague)
})




module.exports = router