const {WorkList,TaskList, User, Otdel} = require('../modeles/models')
const ApiError = require('../error/ApiError')
const {DataTypes} = require('sequelize')
const sequelize = require('../db')
class StatisticsController {
    async projectInfo(req,res,next) 
    {
        try {
            const {Work_id} = req.body
            const allTask = await TaskList.findAndCountAll({where:{Work_id}})
            const complTask = await TaskList.findAndCountAll({where:{Work_id,Completed:1}})
            const procent = Math.round((complTask.count/allTask.count)*100)
            return res.json({
                complTask:complTask.count,
                allTask :allTask.count,
                procent:procent})
        } catch (e) 
            {
                console.log(e)
                return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
            }
    }

    async userInfo(req,res,next) {
        try {
            const {Otdel_id} = req.body
            const text = [{id:0 ,Name:'В отделе нет сотрудников'}]
            const allUser = await User.findAndCountAll({
                attributes: ['id','Name','Login','Otdel_id','PostId'],
                where:{Otdel_id}})
            if (allUser.rows.length===0) {
                return res.json(text) 
            }
            return res.json(allUser)
            } catch (e) {
                console.log(e)
                return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
            }
    }
    async avgTask(req,res,next) 
    {
        try {
            const {Otdel_id} = req.body
            const text = [{id:0 ,Name:'В отделе нет проектов'}]
            const allProject = await WorkList.findAndCountAll({where:{Otdel_id}})
            if (allProject.rows.length===0) {
                return res.json(text) 
            }
            return res.json(allProject)
        } catch (e) 
            {
                console.log(e)
                return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
            }
    }
    async detailProject(req,res,next) 
    {
        try {
            const {Otdel_id} = req.body
            const text = [{id:0 ,Name:'В отделе нет проектов'}]
            const infoProject = await sequelize.query(
                "SELECT a.[id],[Otdel_id],[Text] = a.[Text]+'/'+b.[Text],a.[Completed],a.[DateTimeCreate],a.[DateTimeEnd]FROM [Diplom_BD].[dbo].[WorkList]a JOIN TaskList b on a.id=b.Work_id where [Otdel_id] ="+ `${Otdel_id}`
                )
            return res.json(infoProject)
        } catch (e) 
            {
                console.log(e)
                return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
            }
    }
}

module.exports = new StatisticsController()