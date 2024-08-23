const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    telegramId: {
        type: Number,
        // required: true
        unique: true,
    },
    username: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    blyndCoin: {
        type: Number,
        default: 0
    },
    friends: {
        type: [Object],
        default: []
    },
    referralLink: {
        type: String,
        unique: true
    },
    referrer: {
        type: String,
        default: null,
    },
    tutorials: [{
        tutorial: {
            type: mongoose.Schema.ObjectId,
            ref: "Tutorial"
        },
        status: {
            type: String,
            enum: ['done', 'open'],
            default: 'open'
        }
    }]
})


const User = mongoose.model("Users", UserSchema);

module.exports = User;