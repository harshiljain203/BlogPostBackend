const Admin = require('../../models/admins')
const User = require('../../models/user')
const Blog_Post = require('../../models/blogposts')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const TOKEN_SECRET_KEY = process.env.SECRET_KEY
const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
const SALT = 7

const login = async (req, res) => {
	const {email, password} = req.body
	console.log(email, password)
	try{
			const user =  await Admin.findOne({
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
			else{
				const expiresIn = TOKEN_EXPIRE_TIME; // expires in 30 day
				const secret = TOKEN_SECRET_KEY;
				const accessToken = await jwt.sign(
					{
						id: user.id,
						user_type: 'admin'
					},
					secret,
					{
						expiresIn
					}
				);
	
				console.log("accessToken" , accessToken)
				const r = await Admin.update({is_active: user.is_active+1},{
						where: {
								email,
						}
				})
				console.log("resp ", r, )

				var {password: pass, ...newResponse} = user
				newResponse.accessToken  =accessToken
				console.log(newResponse)
				return res.status(200).json({data: newResponse , message: "Admin login successfully"});
			}
	}
	catch(err){
			console.log("err " , err)
			return res.status(500).json({error: err})
	}
}

const signUp = async (req, res) => {
	try{
		const {full_name, email, password} = req.body
		console.log(SALT)
		const encryptedPwd = await bcrypt.hash(password, SALT);

		const old_user = await Admin.findOne({
			where: {email}
		})
		if(old_user){
			return res.status(401).json({error: "Admin already exsists with same e-mail"})
		}
		const user =  await Admin.create({
				full_name,
				email,
				password: encryptedPwd,
				is_active: 0
		})
		console.log(user)
		const {password: pass, ...newResponse} = user.dataValues
		console.log(newResponse)
		return res.status(200).json({data: newResponse , message: "Admin Created successfully"});
	}
	catch(err){
			console.log("err " , err)
			return res.status(500).json({error: err})
	}
}

const deletePost = async (req, res) => {
	try{
		const {
			admin_id,
			blog_id
		} = req.params
		const user = await Admin.findOne({
			where:{
				id: admin_id
			}
		})
		if(!user){
			return res.status(422).json({
				err: "Invalid admin"
			})
		}
		const blogPost = await Blog_Post.findOne({
			where: {
				id: blog_id
			}
		})
		console.log(blogPost)
		if(blogPost){
			const del = await blogPost.destroy();
			console.log(blogPost)
			return res.status(200).json({data: blogPost , message: "Blog deleted successfully"});
		}
		else{
			return res.status(422).json({err: "No such blog exists"});
		}
	}
	catch(err){
		console.log("err " , err)
		return res.status(500).json({error: err})
	}
}


exports.login = login
exports.signUp = signUp
exports.deletePost = deletePost