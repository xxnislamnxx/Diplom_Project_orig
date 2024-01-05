const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const otderlRouter = require('./otderlRouter')
const workRouter = require('./workRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/otdel', otderlRouter)
router.use('/work',workRouter)
router.use('/comment',commentRouter)
module.exports = router