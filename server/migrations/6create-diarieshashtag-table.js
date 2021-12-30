
'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    return  queryInterface.createTable('DiariesHashtags', {
      diarieId :{
        type : DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model : 'Diaries',
          key : 'id',
        },
      },
      hashtagId :{
        type : DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model : 'Hashtags',
          key : 'id',
        },
      }
    })
    .then( () => 
      queryInterface.addIndex('DiariesHashtags', ['diarieId','hashtagId'], { unique : true })
    )
  },
  down: async (queryInterface, DataTypes) => {
    return queryInterface.dropTable('DiariesHashtags');
  }
};