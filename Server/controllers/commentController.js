//логика 
const {CommentList} = require('../modeles/models')
const ApiError = require('../error/ApiError')

class CommentController {
    async getComments(req,res) {
        const {Task_id} = req.body
        const text = [{id:0 ,Text:'У задачи нет комментарий, вы можете их добавить'}]
        const comment = await CommentList.findAll({where:{Task_id}})
        if (comment.length === 0) {
            return res.json(text)          
        }else
        {
            return res.json(comment)
        }
    }
    
    async setComments(req,res,next) {
        try {
            const {Task_id,User_id,Text} = req.body
            const comment = await CommentList.create({Task_id,User_id,Text})
            return res.json(comment)

        } catch (e) {
            return next(ApiError.badRequest('Возникла непредвиденная ошибка'))           

        }
       
    }

}

    module.exports = new CommentController()