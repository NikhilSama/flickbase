const { roles } = require('../config/roles')

exports.grantAccess =  function(action,response) {
    return async (req,res,next) => {
        try{
            const permission =  roles.can(req.user.role)[action](resource)
            if(!permission.granted){
                return res.status(400).json({
                    error:`User:${req.user.email} role ${req.user.role} not authorized to action:${action} on resource: ${resource}`
                })
            }
            next()
        } catch(err){
            next(err)
        }
    }
}