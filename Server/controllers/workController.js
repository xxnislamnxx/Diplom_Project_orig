//логика 
const {WorkList} = require('../modeles/models')
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
            const work = await WorkList.findAll({where:{Otdel_id}})
            return res.json(work)
        } catch (e) {
            return next(ApiError.badRequest(e +'Возникла непредвиденная ошибка'))
        }

    }

    
    async getTask(req,res) {
        const {Name,Director_Id} = req.body
        const task = await WorkList.create({Name, Director_Id})
        return res.json(work)
    }

}

    module.exports = new workController()