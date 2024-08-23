const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
    title: String,
    tutorialType: {
        type: String,
        enum: ['video', 'blog'],
        default: "blog"
    },
    link: String
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;