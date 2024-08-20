const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
    title: String,
    tutorialType: {
        type: String,
        enum: ['video', 'blog'],
        default: "blog"
    },
    status: {
        type: String,
        enum: ['done', 'open'],
        default: 'open'
    },
    link: String
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;