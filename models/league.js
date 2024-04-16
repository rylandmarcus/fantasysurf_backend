const mongoose  = require('../database/connection')

const leagueSchema = new mongoose.Schema(
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
        leagueLength: String,
        completed: {type: Boolean, default: false},
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