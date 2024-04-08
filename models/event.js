const mongoose = require('../database/connection')

const eventSchema = new mongoose.Schema(
    {
        name: String,
        date: String,
        location: String,
        flag: String,
        image: String,
        surfers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Surfer'
            }
        ],
        scores: [Number],
        eventNumber: Number,
        completed: {type: Boolean, default: false}
    },
    {timestamps: true}
)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event