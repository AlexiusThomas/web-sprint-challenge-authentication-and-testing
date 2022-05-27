const User = require('./auth-model')

function requiredValues(req, res, next){
	if(!req.body.username.length || !req.body.password.length){
		res.status(404).json({
			message: "username and password required"
		})
	}else{
		next()
	}
}

async function checkUsernameFree(req, res, next) {
	try{
        const users = await User.findBy({ username: req.body.username})
        if(!users.length){
        next()
        }else{
        next({status: 422 ,message: "Username taken"})
        }
        }
        catch(err){
        next(err)
        }
    }


    async function checkUsernameExists(req, res, next) {
        try{
        const users = await User.findBy({ username: req.body.username})
        if(users.length){
            req.user = users[0]
            next()
        }else{
            res.status(401).json({
                message: "Invalid credentials"
            })
            // next({status: 401 ,message: "Invalid credentials"})
        }
        }
        catch(err){
        next(err)
        }
  }


  module.exports = {
	checkUsernameFree,
	checkUsernameExists,
	requiredValues,
  }