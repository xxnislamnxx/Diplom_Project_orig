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

// const botPsuh = new TelegramBot(API_KEY_BOT, {

//     polling: {
//         interval: 300,
//         autoStart: true
//       }
    
// });

const botPush= async ()=> {
    try {
        setTimeout(await bot.sendMessage(1696397669, `Я тебе что то хочу отправить...`),100)
        await bot.sendMessage(1696397669, `Я тебе что то хочу отправить...`)
        console.log('Удалось ') 
    } catch (e) {
        console.log(e)
        console.log('Не удалось ')  
    }
}

// })
// Список всех отделов //
bot.onText(/\/all_otdels/, async msg => {

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
                            console.log(response.data)
                         });

                    }) 
                    console.log(arr)
        await bot.editMessageText(`Отделы: <i><b>${str}</b></i>`, 
            {
                parse_mode: "HTML",
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

bot.onText(/\/help/, async msg => {
    await bot.sendMessage(msg.chat.id,`Здраствуйте ${msg.from.first_name}.\n`+
        `Данный бот умеет следующее:\n`+
        `1. Выводить список отделов (команда: /all_otdels)\n`+
        `2. Выводить список всех пользователей (команда: в разработке)\n`+
        `3. Выводить список пользователей в отделе (команда: в разработке)\n`+
        `4. В разработке\n`);
        console.log(msg);

    // await bot.sendMessage(msg.chat.id, `Раздел помощи HTML\n\n<b>Жирный Текст</b>\n<i>Текст Курсивом</i>\n<code>Текст с Копированием</code>\n<s>Перечеркнутый текст</s>\n<u>Подчеркнутый текст</u>\n<pre language='c++'>код на c++</pre>\n<a href='t.me'>Гиперссылка</a>`, {
    //     parse_mode: "HTML"
    // });
    // await bot.sendMessage(msg.chat.id, 'Раздел помощи Markdown\n\n*Жирный Текст*\n_Текст Курсивом_\n`Текст с Копированием`\n~Перечеркнутый текст~\n``` код ```\n||скрытый текст||\n[Гиперссылка](t.me)', {
    //     parse_mode: "MarkdownV2"
    // });
});
bot.on('text', async msg => {
    const URL_TO_BOT = 'https://t.me/TasklistDz_Bot'
    try {

        if(msg.text == '/start') {
            
            await bot.sendMessage(msg.chat.id, `Здраствуйте ${msg.from.first_name} ${msg.from.last_name}. Вы запустили бота!`);
            console.log(msg);
        }
        else if(msg.text == '/help'){}
        else if(msg.text == '/all_otdels'){}
        else {
            await bot.sendMessage(msg.chat.id, `Я не понимаю что вы хотите сказать этим сообщением: "${msg.text}"`);
        }

    }
    catch(error) {

        console.log(error);

    }

})

const commands = 
[
    {
        command: "start",
        description: "Приветствие"
    },
    {
        command: "all_otdels",
        description: "Вывести список отделов"
    },
    {
        command: "help",
        description: "Раздел помощи"
    },
]

bot.setMyCommands(commands);



module.exports = {bot,botPush}
//----//