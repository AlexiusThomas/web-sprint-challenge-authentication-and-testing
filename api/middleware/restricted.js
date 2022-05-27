// const { findBy } = require("../auth/auth-model");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = require('../middleware/secrets')


module.exports = (req, res, next) => {
  
  const token = req.headers.authorization

  console.log('line 22', token)
  if(!token){
    next({status: 401, message: 'Token required'})
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
    console.log('started decode')
    if(err){
      next({status: 401, message: 'Token invalid'})
      return;
    }

    req.decodedJwt = decodedToken;

    next()
  })

};

  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

