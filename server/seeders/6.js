'use strict';
const { Diarie, sequelize, User, Like, Hashtag  } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min + 1 
    const getRandomHashtags = async (ids) => {
      const hashtags = await Hashtag.findAll({ where : { id: ids }})  
      // console.log(hashtags)
      return hashtags
    }
    
    const hashLen = 37
    const diaryLen = 486;

    for(let d = 1 ; d < (hashLen*diaryLen)/2; d++){
      let checkDiary = new Array(diaryLen + 1).fill(false);
      const randHashLen = getRandomNumber(0, 20);
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
    /**
    // await diary.addHashtags(hashtags, { through : DiariesHashtag , ignoreDuplicates : true})
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('Hashtags', null, {})

  }
};
