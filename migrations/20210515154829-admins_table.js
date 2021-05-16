'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("admins", {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
          type: Sequelize.STRING(255),
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          set(val) {
              this.setDataValue("email", val.toLowerCase());
          },
      },
      password: {
          type: Sequelize.STRING(1000),
          required: true,
      },
      is_active: {
          type: Sequelize.TINYINT(1),
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable("admins");
  }
};
