//логика 
const {WorkList,TaskList} = require('../modeles/models')
const ApiError = require('../error/ApiError')

class workController {
    async create(req,res) {
        const {Name,Director_Id} = req.body
        const work = await WorkList.create({Name, Director_Id})
        return res.json(work)
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