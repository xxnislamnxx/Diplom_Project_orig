const ApiError = require('../error/ApiError')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Otdel} = require("../modeles/models")

const generateJwt = (id, Name, Login, Role, PostId, Otdel_id) => {
    return jwt.sign(
        {id, Name, Login, Role, PostId, Otdel_id},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    async registration(req,res,next) {
        
        try {
            const{Name,Login, Password, Role, PostId, Otdel_id} = req.body
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
       const otdelCheck = await Otdel.findOne({where:{id: Otdel_id}})
        if (!otdelCheck) {
            return next(ApiError.badRequest('Отдела с таким ID не существует'))
        }
        /*-------*/ 
        const hashPassword = await bcrypt.hash(Password, 5)
        const user = await User.create({Name,Login, Password: hashPassword, Role, PostId, Otdel_id})
        const token = generateJwt(user.id, user.Name, user.Login, user.Role, user.PostId, user.Otdel_id)
        return res.json({token})
        
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
        const token = generateJwt(user.id, user.Name, user.Login, user.Role, user.PostId, user.Otdel_id)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.Name, req.user.Login,req.user.Role, req.user.PostId, req.user.Otdel_id)
        return res.json({token})
    }

    async getAll (req,res,next){

        try {
            const users = await User.findAll(
                {   
                    
                    attributes: ['id','Name','Login','Role','Otdel_id','PostId']
                })
            return res.json(users)
        } catch (e) {
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }
    
    async getUsers (req,res,next){
        try {
            const{Otdel_id} = req.body
            const text = [{id:1 ,Name:'В отделе нет сотрудников'}]
            const users = await User.findAll(
                {
                    order: [['Postid', 'asc']],
                    attributes: ['id','Name','Login'],
                    where: {Otdel_id: Otdel_id}                
                })
            if (users.length === 0) {
                return res.json(text)          
            }else{
                
            return res.json(users)}
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async getOne(req,res,next) {
        try {
            const {id} = req.body
            const user = await User.findOne({
                attributes: ['id','Name','Login','Otdel_id','PostId'],
                where: {id}})
            return res.json(user)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
}

module.exports = new UserController()