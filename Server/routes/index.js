const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const otderlRouter = require('./otderlRouter')


router.use('/user', userRouter)
router.use('/otdel', otderlRouter)
module.exports = router