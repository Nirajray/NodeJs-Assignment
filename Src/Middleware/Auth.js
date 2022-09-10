const jwt = require("jsonwebtoken");

const authentication = function ( req, res, next) {
    try{
        let token = (req.headers["x-user-key"]); 

        if(!token){
            return res.status(400).send({status:false, message: "Token must be present...!"});
        }

        let decodedToken = jwt.verify(token, 'FunctionUp Group21');

        if (!decodedToken){
            return res.status(400).send({ status: false, message: "Token is invalid"});
        }
          
        let userLoggedIn = decodedToken.userId;
        req["userId"] = userLoggedIn;
        next();
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {authentication}