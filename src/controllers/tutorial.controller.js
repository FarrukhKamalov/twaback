const tutorialModel = require("../models/tutorial");

const tutorialAllGet = async (req, res, next) => {
    try {
        const tutorials = await tutorialModel.find();
        res.status(200).json({
            success: true,
            data: tutorials
        })
    } catch (error) {
        console.log(error)
    }
}


const tutorialCreate = async (req, res, next) => {
    try {
        const { title, tutorialType, link } = req.body;
        const tutorial = await tutorialModel.create({
            title,
            tutorialType,
            link
        });
        res.status(201).json({
            success: true,
            data: tutorial
        })
    } catch (error) {
        console.log(error);
    }
}

const tutorailUpdate = async (req, res, next) => {
    try {
        const body = req.body;
        const { id } = req.params;

        await tutorialModel.findByIdAndUpdate({
            _id: id
        }, {
            ...body
        });

        res.status(200).json({
            success: true,
            data: `Update tutorial id: ${id}`
        })
    } catch (error) {
        console.log(error);
    }
}

const tutorialDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tutorial = await tutorialModel.findById({ _id: id });

        if (!tutorial) {
            return res.status(404).json({
                success: false,
                data: `Not found Tutorial ID: ${id}`
            })
        }

        await tutorialModel.findByIdAndDelete({ _id: id });


        res.json({
            success: true,
            data: `Deleted tutorial ID: ${id}`
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    tutorialAllGet,
    tutorialCreate,
    tutorailUpdate,
    tutorialDelete
}