'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    return  queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId : {
        type: DataTypes.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references:{
          model : 'Users',
          key : 'id',
        },
      },
      diarieId : {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: DataTypes.INTEGER,
        references:{
          model : 'Diaries',
          key : 'id',
        },
      },
    })
    .then( ()=> {
      return queryInterface.addIndex('Likes', ['userId', 'diarieId'], { unique : true })
    })
  },
  down: async (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Likes');
  }
};