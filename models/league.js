const mongoose  = require('../database/connection')

const leagueSchema = new mongoose.Schema(
    //you may need to add like a locked property to the league to prevent people from joining after it starts
    {
        name: String,
        password: String,
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        ],
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },
        leagueType: String,
        leagueSize: Number,
        leagueLength: String,
        completed: {type: Boolean, default: false},
        status: String,
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, 
    {timestamps: true}
)

const League = mongoose.model('League', leagueSchema)

module.exports = League