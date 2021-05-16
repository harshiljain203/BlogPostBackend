const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const BlogPosts = require('../controllers/blogPosts')
const User = require('../controllers/users')
const Admin = require('../controllers/admin')

const UserValidators = require('../controllers/users/validators.js')
const AdminValidators = require('../controllers/admin/validators.js')
const auth = require('./middlewares/auth');
const adminAuth = require('./middlewares/adminAuth');

router.get("/post/getAllPosts/:user_id", auth.authenticate,  BlogPosts.getAllPost)
router.get("/post/getFilteredPost/:user_id", auth.authenticate, BlogPosts.getFilteredPost)
router.get("/post/getPost/:user_id/:blog_id", auth.authenticate, BlogPosts.getPost)
router.post("/post/create/:user_id", auth.authenticate, BlogPosts.create);
router.put("/post/updatePost/:user_id", auth.authenticate, BlogPosts.updatePost)
router.delete("/post/deletePost/:user_id", auth.authenticate, BlogPosts.deletePost)

router.post("/admin/login", AdminValidators.validateLogInData,  Admin.login)
router.post("/admin/signup", AdminValidators.validateSignUpData,  Admin.signUp)
router.delete("/admin/deletePost/:admin_id/:blog_id", adminAuth.authenticate, Admin.deletePost)

// router.use(auth.authenticate);
router.post("/user/login", UserValidators.validateLogInData,  User.login);
router.post("/user/signup", UserValidators.validateSignUpData,  User.signUp);

module.exports = router;


/**
 *  @swagger
 *  /assignment/user/signup:
 *    post:
 *      summary: Used to create new user
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      full_name:
 *                                  type: string
 *                      email:
 *                                  type: string
 *                      password:
 *                                  type: string
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/user/login:
 *    post:
 *      summary: Used to login User
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      email:
 *                                  type: string
 *                      password:
 *                                  type: string
 *        description: login credentials for access token
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/admin/signup:
 *    post:
 *      summary: Used to create new admin
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      full_name:
 *                                  type: string
 *                      email:
 *                                  type: string
 *                      password:
 *                                  type: string
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/admin/login:
 *    post:
 *      summary: Used to login admin
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      email:
 *                                  type: string
 *                      password:
 *                                  type: string
 *        description: login credentials for access token
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */




/**
 *  @swagger
 *  /assignment/admin/deletePost/{admin_id}/{blog_id}:
 *    delete:
 *      summary: Used to delete post by admin
 *      description: Admin can delete any post by the post id
 *      parameters:
 *      - in: path
 *        name: admin_id
 *        required: true
 *        type: string
 *        description: Id of an admin is required
 *      - in: path
 *        name: blog_id
 *        required: true
 *        type: string
 *        description: Id of a blog post is required      
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every admin is required
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */

/**
 *  @swagger
 *  /assignment/post/getAllPosts/{user_id}:
 *    get:
 *      summary: Used to get all posts by user
 *      description: User can get all the blog posts created by him only which contains blog_id, title and author
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        type: string
 *        description: Id of an user is required
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every user is required
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/post/getPost/{user_id}/{blog_id}:
 *    get:
 *      summary: Used to get any particular post by user
 *      description: User can get any particular blog posts created by him only
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        type: string
 *        description: Id of an user is required
 *      - in: path
 *        name: blog_id
 *        required: true
 *        type: string
 *        description: Id of a blog is required
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every user is required
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/post/getFilteredPost/{user_id}:
 *    get:
 *      summary: Used to get filtered blogs post by user
 *      description: User can get all filtered blog posts by author and title created by him only
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        type: string
 *        description: Id of an user is required
 *      - in: query
 *        name: title
 *        type: string
 *        description: Id of an user is required
 *      - in: query
 *        name: author
 *        type: string
 *        description: Id of an user is required
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every user is required
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/post/create/{user_id}:
 *    post:
 *      summary: Used to create post by user
 *      description: User can create the blog posts  which contains title, author and content
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        type: string
 *        description: Id of an user is required
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every user is required
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      title:
 *                                  type: string
 *                      author:
 *                                  type: string
 *                      content:
 *                                  type: string
 *        description: details fto create a new blog post
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */


/**
 *  @swagger
 *  /assignment/post/updatePost/{user_id}:
 *    put:
 *      summary: Used to update post by user
 *      description: User can update the blog posts created by him only which contains some of title, author and content
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        type: string
 *        description: Id of an user is required
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every user is required
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      title:
 *                                  type: string
 *                      author:
 *                                  type: string
 *                      content:
 *                                  type: string
 *                      blog_id:
 *                                  type: integer
 *        description: details to update an existing blog post
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */






/**
 *  @swagger
 *  /assignment/post/deletePost/{user_id}}:
 *    delete:
 *      summary: Used to delete post by admin
 *      description: Admin can delete any post by the post id
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        type: string
 *        description: Id of an admin is required
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *                      blog_id:
 *                                  type: integer   
 *      - in: header
 *        name: accessToken
 *        required: true
 *        type: string
 *        description: Unique AccessToken of every admin is required
 *      responses:
 *        '200':
 *          description: A successfull response
 *        '422':
 *          description: Client Error
 *        '500':
 *          description: Server Error
 */
