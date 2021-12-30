"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Diaries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      userId : {
        type: DataTypes.INTEGER,
        //   allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
          references:{
            model : 'Users',
            key : 'id',
          },
      },
      weather: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      temp: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      tempMax: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      tempMin: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      likeCounts:{
        allowNull: false,
        type: DataTypes.INTEGER,
        default:0
      },
      share: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("NOW()"),
      },
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Diaries");
    // return queryInterface.dropTable('DiariesHashtags')
  },
};