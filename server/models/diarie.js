'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diarie extends Model {
    static associate(models) {
      // this.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });

    }
  };
  Diarie.init({
    image: {
      type:DataTypes.STRING,
      allowNull :false
    },
    content: { 
      type : DataTypes.STRING
    },
    userId : {
      type : DataTypes.INTEGER,
    },
    weather: {
      type: DataTypes.STRING,
      allowNull :false
    },
    temp :{ 
      type: DataTypes.FLOAT,
      allowNull :false,
    },
    tempMax:{
      type: DataTypes.FLOAT,
      allowNull :false
    },
    tempMin:{
      type: DataTypes.INTEGER,
      allowNull :false
    },
    likeCounts:{
      type: DataTypes.INTEGER,
      allowNull :false,
      defaultValue :0
    },
    share:{
      type : DataTypes.BOOLEAN, 
      defaultValue: false,
    }, 
  }, {
    // freezeTableName: true,
    updatedAt:false, // !* query check   
    sequelize,
    modelName: 'Diarie',
  });

  // // !!! 별칭 처리 하기 위해서 이부분 과 User model 의 association을 같이 설정 해줘야 한다 
  // Diarie.associate = (models) => {
  //   Diarie.belongsTo(models.User, {
  //     // onDelete : 'cascade',
  //     as: 'U',
  //     foreignKey : 'userId'
  //   })
  // }

  return Diarie;
};