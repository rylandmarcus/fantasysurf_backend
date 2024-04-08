const mongoose = require('../database/connection')

const surferSchema = new mongoose.Schema(
    {
        name: String,
        country: String,
        flag: String,
        rank: Number,
        image: String,
    },
    {timestamps: true}
)

const Surfer = mongoose.model('Surfer', surferSchema)

module.exports = Surfer