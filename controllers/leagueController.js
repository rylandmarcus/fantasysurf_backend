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
    let leaguesCopy = JSON.parse(JSON.stringify(leagues))
    // let leaguesCopy = [...leagues]
    leaguesCopy.map(league=>{
        return league.currentUser = league.users.indexOf(req.user._id)
    })
    console.log(leaguesCopy)
    // console.log(leagues)
    // res.json(leagues)
    res.json(leaguesCopy)
})

router.get('/joinleague', async (req, res)=>{
    //find all leagues the user is not included in and the league is not complete
    const leagues = await League.find({users: {$ne: req.user._id}, completed: false})
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

router.put('/leaveleague/:id', async (req, res)=>{
    const league = await League.findById(req.params.id)
    let teamId = league.teams[league.users.indexOf(req.user._id)]
    league.users.pull(req.user._id)
    league.teams.pull(teamId)
    await league.save()
    await Team.findByIdAndDelete(teamId)
    res.json(league)
})

router.put('/joinleague/:id', async (req, res)=>{
    const leagueFull = await League.findById(req.params.id)
    await leagueFull.populate({path: 'teams', select: 'name'})
    if (leagueFull.users.includes(req.user._id)){
        res.json({Status: 'alreadyInLeague'})
    } else if (leagueFull.users.length >= leagueFull.leagueSize){
        res.json({Status: 'leagueFull'})
    } else if (leagueFull.completed){
        res.json({Status: 'leagueStarted'})
        //this may need to be tinkered with
    } else if (req.body.password === leagueFull.password){
        let teamNameTaken = false
        for (let i=0; i<leagueFull.teams.length; i++){
            if (leagueFull.teams[i].name === req.body.teamName){
                teamNameTaken = true
                break
            }
        }
        if (teamNameTaken){
            res.json({Status: 'teamNameTaken'})
        } else {  
            const team = await Team.create({name: req.body.teamName})
            const league = await League.findByIdAndUpdate(req.params.id, {$push: {teams: team._id, users: req.user._id}}, {new: true})
            console.log(`user ${req.user._id} joined league ${req.params.id} as team ${team._id}`)
            res.json(league)
        }
    } else if (req.body.password !== leagueFull.password){
        res.json({Status: 'incorrectPassword'})
    }
})

router.get('/:id', async (req, res)=>{
    const league = await League.findById(req.params.id)
    await league.populate('teams')
    leagueCopy = JSON.parse(JSON.stringify(league))
    if (league.users.includes(req.user._id)){
        leagueCopy.currentUser = league.users.indexOf(req.user._id)
    } else {
        leagueCopy.currentUser = -1
    }
    res.json(leagueCopy)
})

router.get('/:id/team/:teamId', async (req, res)=>{
    const league = await League.findById(req.params.id)
    let leagueCopy = JSON.parse(JSON.stringify(league))
    if (league.users.includes(req.user._id)){
        leagueCopy.currentUser = league.users.indexOf(req.user._id)
        if (leagueCopy.teams[leagueCopy.currentUser] === req.params.teamId){
            leagueCopy.myTeam = true
        } else {
            leagueCopy.myTeam = false
        }
    } else {
        leagueCopy.currentUser = -1
        leagueCopy.myTeam = false
    }
    const team = await Team.findById(req.params.teamId)
    await team.populate('surfers')
    console.log({league: leagueCopy, team})
    res.json({league: leagueCopy, team})
})

module.exports = router