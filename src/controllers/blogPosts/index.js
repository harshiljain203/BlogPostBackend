const Blog_Post = require('../../models/blogposts')
const User = require('../../models/user')

const create = async (req, res) => {
    const {
		title,
		author,
		content,
	} = req.body

	const {
		user_id
	} = req.params	

	console.log(title, author, content)
    
		try{

			const user = await User.findOne({
				where:{
					id: user_id
				}
			})
			if(!user){
				return res.status(422).json({
					err: "Invalid User"
				})
			}
			const resp = await Blog_Post.create({
				title,
				author,
				content,
				user_id
			})
			console.log(resp)
			return res.status(200).json({data: resp , message: "Blog Created successfully"});
    }
    catch(err){
			console.log("err " , err)
			return res.status(500).json({error: err})
    }
}

const getPost = async (req, res) => {
	try{
		const {
			user_id,
			blog_id
		} = req.params
		console.log(user_id)
		const user = await User.findOne({
			where:{
				id: user_id
			}
		})
		if(!user){
			return res.status(422).json({
				err: "Invalid User"
			})
		}
		const resp = await Blog_Post.findOne({
			where: {
				user_id,
				id: blog_id
			}
		})
		console.log(resp)
		return res.status(422).json(resp);
	}
	catch(err){
		console.log("err " , err)
		return res.status(500).json({error: err})
	}
}

const getAllPosts = async (req, res) => {
	try{
		const {
			user_id
		} = req.params
		console.log(user_id)
		const user = await User.findOne({
			where:{
				id: user_id
			}
		})
		if(!user){
			return res.status(422).json({
				err: "Invalid User"
			})
		}
		const posts = await Blog_Post.findAll({
			where: {
				user_id
			},
			raw: true,
			attributes: ["id", "title", "author"]
		})

		
		return res.status(200).json(posts);
	}
	catch(err){
		console.log("err " , err)
		return res.status(500).json({error: err})
	}
}


const getFilteredPost = async (req, res) => {
	try{
		const {
			user_id,
		} = req.params
		const {
			title,
			author
		} = req.query
		// console.log("HELLO............ ", user_id, req.query)
		const user = await User.findOne({
			where:{
				id: user_id
			}
		})
		if(!user){
			return res.status(422).json({
				err: "Invalid User"
			})
		}
		const whereClause = {
			user_id
		}
		title ? whereClause.title = title: null
		author ? whereClause.author = author: null
		console.log(whereClause)
		const resp = await Blog_Post.findAll({
			where: whereClause,
		})
		console.log(resp)
		return res.status(200).json(resp);
	}
	catch(err){
		console.log("err " , err)
		return res.status(500).json({error: err})
	}
}


const updatePost = async (req, res) => {
	try{
		const {
			blog_id,
			title,
			author,
			content
		} = req.body

		const {
			user_id
		} = req.params

		console.log("HARSHIl "  , req.body)
		const user = await User.findOne({
			where:{
				id: user_id
			}
		})
		if(!user){
			return res.status(422).json({
				err: "Invalid User"
			})
		}
		var updateData = {}
		console.log(updateData)
		title ? updateData.title = title : null
		author ? updateData.author = author : null
		content ? updateData.content = content : null
		console.log(updateData, user_id, blog_id)
		const blogUpdate = await Blog_Post.update(updateData, {
			where: {
				user_id,
				id: blog_id
			}
		})
		return res.status(200).json({message: "Blog updated Successfully"})
	}
	catch(err){
		console.log("err " , err)
		return res.status(500).json({error: err})
	}
}

const deletePost = async (req, res) => {
	try{
		const {
			blog_id
		} = req.body
		const {
			user_id
		} = req.params

		console.log(user_id)
		const user = await User.findOne({
			where:{
				id: user_id
			}
		})
		if(!user){
			return res.status(422).json({
				err: "Invalid User"
			})
		}
		const resp = await Blog_Post.findOne({
			where: {
				user_id,
				id: blog_id
			}
		})
		if(resp)
		{
			const del = await resp.destroy();
			return res.status(422).json({data: del, message: "Blog Deleted Successfully"});
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

exports.create = create
exports.getPost = getPost
exports.getAllPost = getAllPosts
exports.updatePost = updatePost
exports.getFilteredPost = getFilteredPost
exports.deletePost = deletePost
