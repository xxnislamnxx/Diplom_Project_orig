require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./modeles/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')



const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

//Обработка ошибок, последний Middleware
app.use(errorHandler)


// Тестовый Запрос GET
app.get('/', (req,res) => {
    res.status(200).json({message:'Working!!!'})
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