const tutorialModel = require("../models/tutorial");

const tutorialAllGet = async(req,res,next) => {
    try {
        const tutorials = tutorialModel.find();
        res.status(200).json({
            success: true,
            data: tutorials
        })
    } catch (error) {
        console.log(error)
    }
}


const tutorialCreate = async(req,res,next) => {
    try {
        const {title, tutorialType, link} = req.body;
        const tutorial = await tutorialModel.create({
            title,
            tutorialType,
            link
        })
    } catch (error) {
        console.log(error);
    }
}
 
module.exports = {
    tutorialAllGet,
    tutorialCreate
}