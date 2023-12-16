// переадресация на основную логику
const Router = require('express')
const router = new Router()
const workController = require('../controllers/workController')


router.post('/setWork', workController.setWork)
router.post('/setTask', workController.setTask)
router.post('/updWork', workController.updWork)
router.post('/updTask', workController.updTask)
router.post('/WorkList', workController.getWork)
router.post('/TaskList', workController.getTask)

module.exports = router