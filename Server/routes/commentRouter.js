// переадресация на основную логику
const Router = require('express')
const router = new Router()
const CommentController = require('../controllers/commentController')


router.post('/get', CommentController.getComments)
router.post('/set',CommentController.setComments)

module.exports = router