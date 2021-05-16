const Admin = require('../../models/admins')
const User = require('../../models/user')
const Blog_Post = require('../../models/blogposts')
const Joi = require ("@hapi/joi");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const TOKEN_SECRET_KEY = process.env.SECRET_KEY
const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
const SALT = 7

const login = async (req,res)=>{
    const {email, password} = req.body
    console.log(email, password)
    try{
        const user =  await User.findOne({
					where:{
						email,
					},
					raw: true
        })

				if(!user){
					return res.status(422).json({
						err: "Incorrect email"
					});

				}
				const passwordMatch = await bcrypt.compare(password, user.password);
				if(!passwordMatch)	
					return res.status(422).json({
						err: "Incorrect Password"
					});
				// else if(user && user.is_active>=3)
				// 	res.send({
				// 		err: "Not More than 3 signUp at a time. Please logout user from other sources"
				// 	});
				else{
					const expiresIn = TOKEN_EXPIRE_TIME; // expires in 30 day
					const secret = TOKEN_SECRET_KEY;
					const accessToken = await jwt.sign(
						{
								id: user.id,
								user_type: 'user'
						},
						secret,
						{
								expiresIn
						}
					);
					console.log("accessToken" , accessToken)
					await User.update({is_active: user.is_active+1},{
							where: {
									email,
							}
					})
					var {password: pass, is_active, ...newResponse} = user
					newResponse.accessToken  =accessToken
					console.log(newResponse)
					return res.status(200).json({data: newResponse , message: "User login successfully"});
				}
    }
    catch(err){
        console.log("err " , err)
        return res.status(500).json({error: err})
    }
}

const signUp = async (req,res)=>{
	try{
		const {full_name, email, password} = req.body
		const encryptedPwd = await bcrypt.hash(password, SALT);
		const old_user = await User.findOne({
			where: {email}
		})
		if(old_user){
			return res.status(401).json({error: "User already exsists with same e-mail"})
		}
		const user =  await User.create({
			full_name,
			email,
			password: encryptedPwd,
			is_active: 0
		})
		console.log(user.dataValues)

		const {password: pass, ...newResponse} = user.dataValues
		console.log(newResponse)
		return res.status(200).json({data: newResponse , message: "User Created successfully"});
	}
	catch(err){
		console.log("err " , err);
		return res.status(500).json({error: err})
	}
}

exports.login = login
exports.signUp = signUp