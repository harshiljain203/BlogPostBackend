const { Sequelize, DataTypes } = require('sequelize');
const sequilize = require('../database/connection');

module.exports = sequilize.define("posts" , {
	id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
    },
	title: {
        type: DataTypes.STRING(255),
		required: true,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(255),
		required: true,
		allowNull: false
    },
    content: {
        type: DataTypes.STRING(1000),
    },
    user_id: {
        type: DataTypes.BIGINT(20),
		required: true,
		allowNull: false
    }
},
{
    underscored: true,
    paranoid: true,
    freezeTableName: true,
}
)