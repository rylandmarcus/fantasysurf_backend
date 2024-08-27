const mongoose = require('../database/connection')

const teamSchema = new mongoose.Schema(
    {
        name: String,
        // surfers: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Surfer'
        //     }
        // ],
        surfers: [Number],
        points: {type: Number, default: 0},
    }, 
    {timestamps: true}
)

const Team = mongoose.model('Team', teamSchema)

module.exports = Team