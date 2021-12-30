'use strict';
const { Diarie, Hashtag  } = require('../models');
const { hashLen, diaryLen, maxHash } = require('./const');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min + 1 
    const getRandomHashtags = async (ids) => {
      const hashtags = await Hashtag.findAll({ where : { id: ids }})  
      return hashtags
    }
    
    for(let d = 1 ; d < diaryLen; d++){
      let checkDiary = new Array(diaryLen + 1).fill(false);
      const randHashLen = getRandomNumber(0, maxHash);
      checkDiary[0] = true ;
      let hashArr = []
      for(let i = 1 ; i < randHashLen ; i++ ){
        let checkArr = new Array(hashLen+1).fill(false)
        let hashId = 0 ; 
        checkArr[0] = true 
        
        while(checkArr[hashId]) hashId = getRandomNumber(0, hashLen); 
        checkArr[hashId] = true
        hashArr.push(hashId)
      }
      let diaryId = 0;
      while(checkDiary[diaryId]) diaryId = getRandomNumber(0, diaryLen); 
      const hashtagsnew = await getRandomHashtags(hashArr)
      const diary = await Diarie.findByPk(diaryId)

      await diary.addHashtags(hashtagsnew)
    }
    //  return queryInterface.bulkInsert('Hashtags', hashtag)
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('DiariesHashtags', null, {})

  }
};
