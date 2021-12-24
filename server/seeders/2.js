'use strict';
const { Diarie, sequelize, User, Like  } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // * When user add likes on diary-post
    const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min + 1
    const method1 = async (diaryId, userId) => {
      await Like.create({ diarieId : diaryId, userId : userId})
      const diary = await Diarie.findByPk(diaryId)
      await diary.increment(['likeCounts'], {by : 1})
    }

    const check1 = async (diaryId, userId) => {
      const foundDiary = await Diarie.findByPk(diaryId);
      const likeCount = await foundDiary.getLikes();
      console.log("diarieId =", diaryId, "like 갯수=", likeCount.length)
    }
    
    const userLen = 20;
    const diaryLen = 486;
    let checkArr = new Array(userLen+1).fill(0).map( _ => new Array(diaryLen+1).fill(false))
    checkArr[0][0] = true;
    for(let i = 1 ; i < 2*(userLen*diaryLen/5); i++ ){ // like data len = 500
      let userId = 0
      let diaryId = 0
      while(checkArr[userId][diaryId]){
        userId =getRandomNumber(0,userLen)
        diaryId = getRandomNumber(0,diaryLen) 
      } 
      checkArr[userId][diaryId] = true;
      await method1(diaryId,userId);
    }
      // await check1(12,5)
  },
  down: async (queryInterface, Sequelize) => {
  }
};
