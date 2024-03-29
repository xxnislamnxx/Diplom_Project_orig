//логика 
const {Otdel} = require('../modeles/models')
const ApiError = require('../error/ApiError')

class OtdelController {
    async create(req,res) {
        const {Name} = req.body
        const otdel = await Otdel.create({Name})
        return res.json(otdel)
    }
    
    async getAll(req,res,next) {
        try {
            let {limit, page} = req.query
            /*page = page || 1
            limit = limit || 3
            let offset = page * limit - limit*/
            let otdels;
            //otdels = await Otdel.findAndCountAll()
            otdels = await Otdel.findAll()

            return res.json(otdels)
        } catch (e) {
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))            

        }
       
    }

    async getOne(req,res) {
        const {id} = req.body
        const otdel = await Otdel.findOne({where:{id}})
     return res.json(otdel)   
    }

}

    module.exports = new OtdelController()