const jwt = require("jsonwebtoken");
// const errMessage = require("../../../config/messages.json").errMessages;
// const Response = require("../../../app/controllers/helper/responseFormat");

const TOKEN_SECRET_KEY = process.env.SECRET_KEY
const TOKEN_EXPIRE_TIME = "1d";
const SALT = 7


const auth = async (req, res, next) => {
    try{
        const {user_id} = req.params
        let accessToken = null;
        const { authorization = "" } = req.headers || {};
        if (authorization) {
            const bearer = authorization.split(" ");
            if (bearer.length === 2) {
                accessToken = bearer[1];
            }
        }

        console.log("DONE", req.headers.accesstoken)
        if(!accessToken){
            accessToken = req.headers.accesstoken
        }
        // console.log("ACCESS TOKEN AUTH ---> ", accessToken);

        if (accessToken) {
            const secret = TOKEN_SECRET_KEY;
            console.log("decodedAccessToken", accessToken)
            const decodedAccessToken = await jwt.verify(accessToken, secret);
            const access_token = decodedAccessToken.accessToken;
            console.log(decodedAccessToken)
            const {id, user_type} = decodedAccessToken
            if(id === parseInt(user_id) && user_type === 'user'){
                console.log("HELLO")
            }
            else{
                return res.status(422).send({ message: 'Unauthorised accessToken of another user' });
            }
        } else {
            return res.status(422).send({ message: 'Unauthorised User' });
            // return res.status(401).json(response.getResponse());
        }
        next();
    }
    catch(err){
        console.log("errr ===== ", err.name,err.message);
        let payload = {};
        if (err.name === "TokenExpiredError") {
            payload = {
                code: 401,
                error: "session expired"
            };
        } else if (err.name === "JsonWebTokenError") {
            payload = {
                code: 401,
                error: err.message
            };
        } else {
            payload = {
                code: 500,
                error: "Server Error"
            };
        }

        return res.status(payload.code).json({error: payload.error});
    }

};


// module.exports = auth;

exports.authenticate = auth;