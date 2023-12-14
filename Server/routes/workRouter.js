// переадресация на основную логику
const Router = require('express')
const router = new Router()
const workController = require('../controllers/workController')


router.post('/', workController.create)
router.post('/WorkList', workController.getWork)
router.post('/TaskList', workController.getTask)

module.exports = router