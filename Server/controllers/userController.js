const ApiError = require('../error/ApiError')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require("../modeles/models")

const generateJwt = (id,  Name, Login) => {
    return jwt.sign(
        {id, Name, Login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req,res,next) {
        
        try {
            const{Name,Login, Password, PostId, Otdel_id} = req.body
        //Проверка на введеный логин или пароль --------------
        if (!Login || !Password) {
            return next(ApiError.badRequest('Неккоректный login или пароль'))
        }
        //Проверка существует такой логин или нет.--------------
        const candidate = await User.findOne({where:{Login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        }
        //Проверка на существует указаный ID отдела --------------
       const otdelCheck = await User.findOne({where:{Otdel_id}})
        if (!otdelCheck) {
            return next(ApiError.badRequest('Отдела с таким ID не существует'))
        }
        /*-------*/ 
        const hashPassword = await bcrypt.hash(Password, 5)
        const user = await User.create({Name,Login, Password: hashPassword, PostId, Otdel_id})
        const token = generateJwt(user.id, user.Name, user.Login)
        return res.json(token)
        
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))            
        }
        
    }
    
    async login(req,res,next) {
        const {Login, Password} = req.body
        const user = await User.findOne({where: {Login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))            
        }
        let comparePassword = bcrypt.compareSync(Password, user.Password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.Name, user.Login)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.Name, req.user.Login)
        return res.json({token})
    }

    async getAll (req,res,next){

        try {
            const users = await User.findAll({attributes: ['id','Name','Login']})
            return res.json(users)
        } catch (e) {
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }

}

module.exports = new UserController()