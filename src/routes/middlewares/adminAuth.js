const jwt = require("jsonwebtoken");
// const errMessage = require("../../../config/messages.json").errMessages;
// const Response = require("../../../app/controllers/helper/responseFormat");

const TOKEN_SECRET_KEY = process.env.SECRET_KEY
const TOKEN_EXPIRE_TIME = "1d";
const SALT = 7


const auth = async (req, res, next) => {
    try{
        let accessToken = null;
        const {admin_id} = req.params
        var { authorization = "" } = req.headers || {};

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
        console.log(accessToken)
        // console.log("ACCESS TOKEN AUTH ---> ", accessToken);

        if (accessToken) {
            const secret = TOKEN_SECRET_KEY;
            console.log("decodedAccessToken")
            const decodedAccessToken = await jwt.verify(accessToken, secret);
            console.log("decodedAccessToken " , decodedAccessToken)
            const {id, user_type} = decodedAccessToken

            // console.log("HARSHIl " , is, user_type, admin_id)
            if(id === parseInt(admin_id) && user_type === 'admin'){

            }
            else{
                return res.status(422).send({ message: 'Unauthorised accessToken of another user' });
            }
            const access_token = decodedAccessToken.accessToken;

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

exports.authenticate = auth;