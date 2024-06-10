// const getUsers = async (Otdel_id) => {
//     const {data} = await $host.post('api/user/getUsers', {Otdel_id} )
//     return data
// }
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios') 
const { getAll } = require('../controllers/userController');

//---Telegram Bot---//
const API_KEY_BOT = '6723208789:AAFxcrJrBukKnI6v-GoFjgQMni7uFtfaN7Q';

// const getaAll = async () => {
//     const {data} = await localhost.get('api/user/getaAll')
//     return data
// }



const bot = new TelegramBot(API_KEY_BOT, {

    polling: {
        interval: 300,
        autoStart: true
      }
    
});

bot.on('text', async msg => {

    const msgWait = await bot.sendMessage(msg.chat.id, `Бот генерирует ответ...`);
    let arr = [] // Для проучения массива
    let str = '' // Для сохранеия массива в строку
    setTimeout(async () => {
        try {
            await axios.get( 
                'http://localhost:5000/api/otdel/getAll') 
                    .then(response => { 
                        response.data.forEach((item,index) => {
                    //--------Парсим в строку--------//
                            arr.push(item.Name)
                            str = arr.join(', ')
                         });

                    }) 
                    console.log(arr)
        await bot.editMessageText(`Отделы: ${str}`, 
            {
                chat_id: msgWait.chat.id,
                message_id: msgWait.message_id
            });
        console.log('Удалось ') 
        } catch (e) {
            console.log(e)
            console.log('Не удалось ')  
        }
    },500);

})
module.exports = bot
//----//