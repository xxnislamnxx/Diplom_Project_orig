//логика 
const {WorkList,TaskList, User, Otdel} = require('../modeles/models')
const ApiError = require('../error/ApiError')

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
        const task = await TaskList.update({Completed},{where:{id}})
        return res.json(task)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
        }
    }
    async getWork(req,res,next) {
        try {
            const {Otdel_id} = req.body
            const text = [{id:1 ,Text:'В отделе нет проектов, для создания проекат обратитесь к руководителю'}]
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
                const {Work_id} = req.body
                const text = [{id:1 ,Text:'В проекте нет задач, для создания обратитесь к руководителю'}]
                const task = await TaskList.findAll({where:{Work_id}})
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