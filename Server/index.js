require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./modeles/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const TelegramBot = require('node-telegram-bot-api');
const {bot,botPush} = require('./telegrammBot/bot')
//const botPush = require('./telegrammBot/bot')
const axios = require('axios') 

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
//app.use(botPsuh)

//app.use('./telegrammBot/bot',bot)
//Обработка ошибок, последний Middleware
app.use(errorHandler)

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
        
        
        // try{
        //     let arr=[]
        //     axios.get( 
        //         'http://localhost:5000/api/otdel/getAll') 
                
        //           // Print data 
        //           .then(response => { 
        //              const { id, Name } = response.data 
        //              console.log(response.data )
        //              response.data.forEach((item,index) => {
        //                 console.log(`Отдел: ${item.Name}`)
        //                 //arr.concat(`Отдел: ${item.Name}`)
        //                // console.log(arr)
        //              });
        //              //console.log(response.data.Name.join())
        //              //console.log(arr)
        //         })  
        //     console.log('Удалось ') 
        // } catch (e) {
        //     console.log(e)
        //     console.log('Не удалось ')  
        // }


    } catch (e) {
        console.log(e)
    }
}

start()
//botPush()

// команды старта - npm run dev
// команда установки - npm install [пакет]
// команда приостановки - Ctrl + C 
/* Полезный запрос в бд:
Удаляет все данные с таблицы если есть foreign key DELETE FROM [Otdel]
DBCC CHECKIDENT ('[Diplom_BD].[dbo].[Otdel]', RESEED, 0)    */