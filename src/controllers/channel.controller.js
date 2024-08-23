const channelModel = require("../models/channel");


const getChannels = async (req, res) => {
    try {
        const channels = await channelModel.find();
        res.status(200).json({
            success: true,
            data: channels
        });
    } catch (error) {
        console.log(error)
    }
}

const createChannel = async (req, res) => {
    try {
        const { channelName, channelLink, channelImage } = req.body;

        const newChannel = new channelModel({
            channelName,
            channelLink,
            channelImage
        })

        await newChannel.save()

        res.status(201).json({
            success: true,
            data: newChannel
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteChannel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundChannel = await channelModel.findById({ _id: id });
        if (!foundChannel) {
            res.status(404).json({
                success: false,
                data: "Not found  channel"
            })
        }

        await channelModel.findByIdAndDelete({ _id: id });

        res.status(200).json({
            success: true,
            data: "Channel deleted!"
        })
    } catch (error) {
        console.log(error)
    }
}

const updateChannel = async(req, res, next) => {
    try {
        const {id} = req.params; 
        const body = req.body;
        const foundChannel = await channelModel.findById({ _id: id });
        if (!foundChannel) {
            res.status(404).json({
                success: false,
                data: "Not found channel"
            })
        }

        const channel = await channelModel.findByIdAndUpdate({_id: id}, {
            ...body
        });

        res.status(200).json({
            success: true,
            data: `Updated channel id: ${channel._id}`
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getChannels,
    createChannel,
    deleteChannel,
    updateChannel
}