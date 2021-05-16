const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

module.exports = sequelize;