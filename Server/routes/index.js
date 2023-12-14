const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const otderlRouter = require('./otderlRouter')
const workRouter = require('./workRouter')

router.use('/user', userRouter)
router.use('/otdel', otderlRouter)
router.use('/work',workRouter)
module.exports = router