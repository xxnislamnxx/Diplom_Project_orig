// переадресация на основную логику
const Router = require('express')
const router = new Router()
const StatisticsController = require('../controllers/StatisticsController')


router.post('/avgTask', StatisticsController.avgTask)
router.post('/userInfo', StatisticsController.userInfo)
router.post('/projectInfo', StatisticsController.projectInfo)
router.post('/detailProject', StatisticsController.detailProject)
module.exports = router