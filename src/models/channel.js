const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
    channelName: String,
    channelLink: String,
    channelImage: String
});

const Channel = mongoose.model("Channel", ChannelSchema);

module.exports = Channel;