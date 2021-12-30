'use strict';
const { hashArr } = require('./const')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   const hashtag = hashArr.map( ele => { return { name : ele }} ) 
   return queryInterface.bulkInsert('Hashtags', hashtag)
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hashtags', null, {})
  }
};
