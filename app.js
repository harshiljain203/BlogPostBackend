const express = require("express")
const app = express()
const { Sequelize } = require('sequelize')
const bodyParser = require('body-parser')
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
require('dotenv').config()

//DB CONNECTION 
const db = require('./src/database/connection')

db.authenticate()
.then(()=>{
    console.log("CONNECTED....")
})
.catch(err => {
    console.log("ERR " , err)
})

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "APIs",
			description: "Blog Post Assignment APIs",
			servers: [`http://localhost:${process.env.PORT}`]
		}
	},
	apis: ["./src/routes/index.js"]
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.get('/', (req, res) => res.status(200).send("Server Is Running..."));
app.use('/assignment', require('./src/routes'))

app.listen(3001)