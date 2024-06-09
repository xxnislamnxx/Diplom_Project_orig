require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./modeles/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const TelegramBot = require('node-telegram-bot-api');
const bot = require('./telegrammBot/bot')
const axios = require('axios') 

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
//app.use('./telegrammBot/bot',bot)
//Обработка ошибок, последний Middleware
app.use(errorHandler)

// axios.get( 
//     'http://localhost:5000/api/user/getAll') 
      
//           // Print data 
//           .then(response => { 
//              const { id, Name } = response.data 
//              console.log(`Name ${id}: ${Name}\n`) 
//           }) 

// //---Telegram Bot---//
// const API_KEY_BOT = '6723208789:AAFxcrJrBukKnI6v-GoFjgQMni7uFtfaN7Q';

// const bot = new TelegramBot(API_KEY_BOT, {

//     polling: {
//         interval: 300,
//         autoStart: true
//       }
    
// });

// bot.on('text', async msg => {

//     const msgWait = await bot.sendMessage(msg.chat.id, `Бот генерирует ответ...`);

//     setTimeout(async () => {

//         await bot.editMessageText(msg.text, {

//             chat_id: msgWait.chat.id,
//             message_id: msgWait.message_id
            
//         });
        
//     },500);

// })

// //----//

// Тестовый Запрос GET
app.get('/', (req,res) => {
    res.status(200).json({message:'Working!!!'})
})
app.get("/", function(req, res) {
    res.send("Hello Worlxxxxd!")
})


//app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
const start = async () => {
    try {
        console.log('Попытка авторизации в БД')
        try {
            //await sequelize.authenticate() //тестовое подключение
            await sequelize.sync()
            console.log('Авторизация прошла успешно')
        } catch (e) {
            console.log(e)
            console.log('Не удалось подключится к БД')  
        }

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
        
        
        try{
 
            axios.get( 
                'http://localhost:5000/api/otdel/getAll') 
              
                  // Print data 
                  .then(response => { 
                     const { id, Name } = response.data 
                     console.log(response.data ) 
                }) 
            console.log('Удалось ') 
        } catch (e) {
            console.log(e)
            console.log('Не удалось ')  
        }


    } catch (e) {

        console.log(e)
  
    }
}

start()
// команды старта - npm run dev
// команда установки - npm install [пакет]
// команда приостановки - Ctrl + C 
/* Полезный запрос в бд:
Удаляет все данные с таблицы если есть foreign key DELETE FROM [Otdel]
DBCC CHECKIDENT ('[Diplom_BD].[dbo].[Otdel]', RESEED, 0)    */