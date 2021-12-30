"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {
      // models.User.belongsToMany(models.Diarie, { through : Like, foreignKey : 'userId', });
      // models.Diarie.belongsToMany(models.User, { through : Like, foreignKey : 'diarieId', });
    }
  }

  Like.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId : {
        type: DataTypes.INTEGER,
      },
      diarieId : {
        type: DataTypes.INTEGER,
      },

    },
    {
      // freezeTableName : true,
      indexes: [{
        unique: true,
        fields: ['userId', 'diarieId']
      }],
      timestamps: false,
      sequelize,
      modelName: "Like",
    }
  );


  return Like;
};