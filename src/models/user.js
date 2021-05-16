const { Sequelize, DataTypes } = require('sequelize');
const sequilize = require('../database/connection');

module.exports = sequilize.define("users" , {
    
	id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(val) {
            this.setDataValue("email", val.toLowerCase());
        },
    },
    password: {
        type: DataTypes.STRING(1000),
        required: true,
    },
    is_active: {
        type: DataTypes.TINYINT(1),
    },
},
{
    underscored: true,
    paranoid: true,
    freezeTableName: true,
}

)