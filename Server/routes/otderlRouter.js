// переадресация на основную логику
const Router = require('express')
const router = new Router()
const otdelController = require('../controllers/otdelController')


router.post('/', otdelController.create)
router.get('/getAll',otdelController.getAll)
router.get('/getOne/:id',otdelController.getOne)

module.exports = router