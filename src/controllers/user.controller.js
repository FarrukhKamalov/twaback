const { Context } = require("telegraf");
const User = require("../models/user");


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.log("get users error: ", error.stack);
        res.status(500).json({
            success: false,
            data: error.stack
        })
    }
}

const userCreate = async (req, res, next) => {
    try {
        const { telegramId, username, firstname, lastname } = req.body.userData;
        const { start_param } = req.body;
        const isUser = await User.findOne({ telegramId });
        console.log(req.body)
        if (!isUser) {
            const user = new User({
                telegramId,
                username,
                firstName: firstname,
                lastName: lastname,
                referralLink: `https://t.me/tradingbotRecursionbot?start=${telegramId}`
            });

            if (start_param == telegramId) {
                user.referrer = null;
            }

            if (start_param !== telegramId && start_param !== null) {
                user.referrer = start_param;

                const referrerUser = await User.findOne({ telegramId: start_param })

                referrerUser.friends.push({
                    telegramId: user.telegramId,
                    user: user.username ? user.username : user.firstName
                });
                referrerUser.blyndCoin += 10;

                await referrerUser.save()
                console.log(referrerUser)


            }
            user.save();
            return res.status(201).json({
                success: true,
                data: user
            });
        }

        return res.status(200).json({
            success: true,
            data: isUser
        })




    } catch (error) {
        console.log("create users error: ", error.stack);
        res.status(500).json({
            success: false,
            data: error.stack
        })
    }
}




const updateUserTutorialStatus = async (req, res, next) => {
    try {
        const { telegramId, tutorialId } = req.body;

        const user = await User.findOne({ telegramId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        let tutorialFound = false;

        // Foydalanuvchining tutoriallari ro'yxatini ko'rib chiqamiz
        user.tutorials.forEach((item) => {
            if (item.tutorial.equals(tutorialId)) {
                item.status = 'done';
                tutorialFound = true;
            }
        });

        // Agar tutorial topilmasa, yangi tutorialni qo'shamiz
        if (!tutorialFound) {
            user.tutorials.push({
                tutorial: tutorialId,
                status: 'done'
            });
        }

        await user.save();

        return res.status(200).json({
            success: true,
            data: user.tutorials
        });

    } catch (error) {
        console.log("updateUserTutorialStatus error: ", error.stack);
        res.status(500).json({
            success: false,
            data: error.stack
        });
    }
}

const getUser = async(req,res,next) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({telegramId: id});

        if(!user){
            return   res.status(404).json({
                success: false,
                data: "Not found User"
            })
        }

        res.status(200).json({
            success: true, 
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.stack
        });
    }
}


module.exports = {
    getUsers,
    userCreate,
    updateUserTutorialStatus,
    getUser
}