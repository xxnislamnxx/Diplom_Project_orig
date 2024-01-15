const {WorkList,TaskList, User, Otdel} = require('../modeles/models')
const ApiError = require('../error/ApiError')
const {DataTypes, QueryTypes} = require('sequelize')
const sequelize = require('../db')
class StatisticsController {
    async currentWork(req,res,next) 
    {
        try {
            const {Work_id} = req.body
            const allTask = await TaskList.findAndCountAll({where:{Work_id}})
            const currentWork = await WorkList.findAll({where:{id:Work_id}})
            const complTask = await TaskList.findAndCountAll({where:{Work_id,Completed:1}})
            const procent = Math.round((complTask.count/allTask.count)*100)
            return res.json({
                complTask:complTask.count,
                allTask :allTask.count,
                procent:procent,
                currentWork
            })
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
    async allProject(req,res,next) 
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
    async allTask(req,res,next) 
    {
        try {
            const {Work_id} = req.body
            const text = [{id:0 ,Name:'В отделе нет задач'}]
            const allTask = await TaskList.findAndCountAll({where:{Work_id}})
            if (allTask.rows.length===0) {
                return res.json(text) 
            }
            return res.json(allTask)
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
                "SELECT COUNT(b.id) as AllTask,"+
                "(SELECT Count(b.id) FROM [Diplom_BD].[dbo].[WorkList] as a "+
                  "JOIN TaskList as b on a.id=b.Work_id where [Otdel_id] = "+ `${Otdel_id}`+" and b.Completed=1) as Compl "+
                  "FROM [Diplom_BD].[dbo].[WorkList] a "+
                 " JOIN TaskList b on a.id=b.Work_id where [Otdel_id] = "+ `${Otdel_id}`
                 ,{ type: QueryTypes.SELECT, raw: true, model: WorkList }
                )
                const hourAVG = await sequelize.query(
                    "SELECT hourAVG = AVG(ABS(DATEDIFF(hour,b.[DateTimeEnd],b.[DateTimeCreate])))/24"+
                    "FROM [Diplom_BD].[dbo].WorkList a "+
                    "JOIN [TaskList] b on b.Work_id=a.id "+
                    "where [Otdel_id] = "+`${Otdel_id}`
                     ,{ type: QueryTypes.SELECT, raw: true, model: WorkList})
            return res.json({
                AllTask:infoProject[0].AllTask,
                Compl:infoProject[0].Compl,
                hourAVG:hourAVG[0].hourAVG
            })
        } catch (e) 
            {
                console.log(e)
                return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
            }
    }

    async detailTask(req,res,next) 
    {
        try {
            const {id} = req.body
            const text = [{id:0 ,Name:'В отделе нет задач'}]
            const currentTask = await TaskList.findOne({where:{id}})
            if (currentTask===null) {
                return res.json(text) 
            }
            const user = await User.findOne({where:{id:currentTask.User_id},attributes:['Name']})
            const work = await WorkList.findOne({where:{id:currentTask.Work_id},attributes:['Text']})
            return res.json({
                userName:user.Name,
                workName:work.Text,
                currentTask})
        } catch (e) 
            {
                console.log(e)
                return next(ApiError.badRequest('Возникла непредвиденная ошибка'))
            }
    }
}

module.exports = new StatisticsController()