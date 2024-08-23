const {Telegraf} = require("telegraf");
const axios = require('axios');

const bot = new Telegraf("7283186749:AAFUxIXH39E_yyGCEM8Wf10jadkFBdHrmZ4");

const startBot = () => {
    bot.start(async (ctx) => {
        const startPayload = ctx.startPayload;
        console.log('Start payload:', startPayload);
        // console.log(ctx.from)

        let referrerId = null;
        if (startPayload) {
            referrerId = startPayload;
            console.log('Referrer ID:', referrerId);
        }


        const userData = {
            telegramId: ctx.from.id,
            username: ctx.from.username || null,
            firstname: ctx.from.first_name || null,
            lastname: ctx.from.last_name || null,
            
        };

        try {
            const response = await axios.post('https://twaback.onrender.com/api/v1/users/create', {
                userData,
                start_param: referrerId
            });

            if (response.data.success) {
                ctx.reply('Salom Blynd Telegram web appiga hush kelibsiz.');
            } else {
                ctx.reply('Salom authenticationdan o`tolmadingiz');
            }
        } catch (error) {
            console.log("telegram bot error: ", error);
            ctx.reply(`Error: ${error.message}`);

        }
    });

    bot.launch().then(() => console.log('Bot started'));
};


module.exports = startBot;