//логика 
const {WorkList,TaskList, User, Otdel} = require('../modeles/models')
const ApiError = require('../error/ApiError')
const {DataTypes} = require('sequelize')

class workController {
    async setWork(req,res,next) {
        try {
        const {Otdel_id,Text,Completed} = req.body
        const otdelCheck = await Otdel.findOne({where:{id: Otdel_id}})
            if (!otdelCheck) {
                return next(ApiError.badRequest('Отдела с таким ID не существует'))
            }
        const work = await WorkList.create({Otdel_id,Text,Completed})
        return res.json(work)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }
    async updWork(req,res,next) {
        try {
        const {id,Completed} = req.body
        const work = await WorkList.update({Completed},{where:{id}})
        return res.json(work)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }
    async setTask(req,res,next) {
        try {
            const {Work_id,User_id,Text,Completed} = req.body
            const workCheck = await WorkList.findOne({where:{id:Work_id}})
            if (!workCheck) {
                return next(ApiError.badRequest('Отдела с таким ID не существует'))
            }
            const userCheck = await User.findOne({where:{id:User_id}})
            if (!userCheck) {
                return next(ApiError.badRequest('Пользователь с таким именем не существует'))
            }
            const task = await TaskList.create({Work_id,User_id,Text,Completed})
            return res.json(task)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }
    async updTask(req,res,next) {
        try {
        const {id,Completed} = req.body
        let task
        if (Completed) {
            const now=new Date()
            task = await TaskList.update({Completed,DateTimeEnd:now},{where:{id}})

            console.log('DateTimeEnd:',now)
        } else {
            task = await TaskList.update({Completed,DateTimeEnd:null},{where:{id}})
        }
   
        return res.json(task)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }

    async delWork(req,res,next) {
        try {
        const {Work_id} = req.body
        const work = await WorkList.destroy({where:{id:Work_id}})
        const task = await TaskList.destroy({where:{Work_id}})
        return res.json('Удаление прошло успешно')
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }
    
    async delTask(req,res,next) {
        try {
        const {Otdel_id} = req.body
        const task = await TaskList.destroy({where:{Work_id}})
        return res.json('Удаление прошло успешно')
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }

    async getWork(req,res,next) {
        try {
            const {Otdel_id} = req.body
            const text = [{id:0 ,Text:'В отделе нет проектов, для создания проекат обратитесь к руководителю'}]
            const work = await WorkList.findAll({where:{Otdel_id}})
            if (work.length === 0) {
                return res.json(text)          
            }else{
                
            return res.json(work)}
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    async getTask(req,res,next) {
            try {
                const {Work_id,Sort,Dir} = req.body
                const text = [{id:0 ,Text:'В проекте нет задач, для создания обратитесь к руководителю'}]
                const sort = Sort|| "id"
                const dir = Dir || "ASC"
                const task = await TaskList.findAll({
                    where:{Work_id},
                    order:[
                        [`${sort}`,`${dir}`]
                    ]
                })
                if (task.length === 0) {
                    return res.json(text)          
                }else{
                    
                return res.json(task)}
            } catch (e) {
                return next(ApiError.badRequest(e))
            }
    
        }
}

    module.exports = new workController()