// переадресация на основную логику
const Router = require('express')
const router = new Router()
const StatisticsController = require('../controllers/StatisticsController')


router.post('/currentWork', StatisticsController.currentWork)
router.post('/userInfo', StatisticsController.userInfo)
router.post('/allProject', StatisticsController.allProject)
router.post('/allTask', StatisticsController.allTask)
router.post('/detailProject', StatisticsController.detailProject)
router.post('/detailTask', StatisticsController.detailTask)
module.exports = router