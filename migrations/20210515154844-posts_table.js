'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("posts", {
    	id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        required: true,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        required: true,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING(1000),
      },
      user_id: {
        type: Sequelize.BIGINT(20),
        required: true,
        allowNull: false
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable("posts");
  }
};
