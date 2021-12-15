"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Diaries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      weather: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      temp: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      tempMax: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      tempMin: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // !!! 지우는게 일단 됫었다!
        // references: {
        //   model: {
        //     tableName: 'Users'
        //   },
        //   key: 'id'
        // }
      },
      likeCounts:{
        allowNull: false,
        type: Sequelize.INTEGER,
        default:0
      },
      share: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Diaries");
  },
};