const authenticate = function Authenticate(req,res,next) {
    console.log('Authenticating ....');
    next();//pass control to next middleware
}

module.exports = authenticate;