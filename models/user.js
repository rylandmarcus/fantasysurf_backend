const mongoose = require('../database/connection')

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        nickname: String,
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        ]
    },
    {timestamps: true}
)

const User = mongoose.model('User', userSchema)

module.exports = User