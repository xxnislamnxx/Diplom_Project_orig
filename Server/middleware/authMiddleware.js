const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    try {
    if (req.method === "OPTIONS") {
        next()
    }
        const token = req.headers.authorization.split(' ')[1] // Bearer afafxcvdg
        if (!token) {
            return res.status(401).json({message: "Не sss"})            
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        
        next()
    } catch (e) {
        return res.status(401).json({message: "Не авторизован",e})
        //return res.status(401).json({message: "Не авторизован",e})
    }
}