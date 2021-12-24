'use strict';
const { Diarie, sequelize, User, Like  } = require('../models')
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const getImageFiles = () => {
      let imgArr = []
      let lenArr = []
      const path = fs.readdirSync(__dirname + "/image")
      path.forEach(dir => {
        if(dir !== '.DS_Store'){
          const nnon = fs.readdirSync(__dirname + "/image/" + dir)
          imgArr.push(nnon)
          lenArr.push(...nnon)
        } 
      });
      return [imgArr, lenArr.length]
    }
    
    const getRandonNumber = (min, max) => Math.floor( Math.random()* max ) + min 
    const getDiaryData = (userid, idx, img) => {
      const tempArr = getTemper()
      return {
        image : "https://s3.us-east-2.amazonaws.com/gathercoding.co/" + (img),
        content : 'dummy content' + (userid),
        weather : 'weather' + (userid),
        temp : tempArr[idx][0]+ getRandonNumber(0,3), 
        tempMax : tempArr[idx][1], 
        tempMin : tempArr[idx][0],
        share : true,
        userId : userid,
        likeCounts : 0,
      }
    }
    const createUserData = async (userLen) => {
      const nameArr = ['minch', 'donghk', 'yoonhw', 'younghw','ciara', 'clare', 'Moody', 'Sun', 'Jungmin', 'Dongmin', 
                      'Yoonmin', 'Keymin', 'Samhwan', 'Sehwan', 'Soo', 'Sea', 'Lay', 'Kasom', 'Siara', 'Suji', 'Leina', ]
      const userData = new Array(userLen).fill(0).map( (ele, idx) => {
        const data =   { 
          userName : nameArr[idx],
          email : `abc${idx+1}@email.com`,
          password : `1234`,
          gender : getRandonNumber(0,100)%2 ? 'male' : 'female',
          social : false,
        }
        return data
      })
      return await queryInterface.bulkInsert( 'Users' ,userData, { returning : true })
    }
    
    const getTemper = () => {
      let [a, b] = [getRandonNumber(0,20)*(-1), getRandonNumber(0, 20)*(-1)]
      let [oneMin, oneMax] = [Math.min(a,b), Math.max(a,b)]

      [a, b] = [getRandonNumber(0,15)*(-1), getRandonNumber(0, 15)*(-1)]
      let [twoMin, twoMax] = [Math.min(a,b), Math.max(a,b)]
      
      [a, b] = [getRandonNumber(0,15)*(-1), getRandonNumber(0, 5)]
      let [threeMin, threeMax] = [Math.min(a,b), Math.max(a,b)]
 
      [a, b] = [getRandonNumber(0,17)*(-1), getRandonNumber(0, 9)]
      let [fourMin, fourMax] = [Math.min(a,b), Math.max(a,b)]
     
      [a, b] = [getRandonNumber(0,5)*(-1), getRandonNumber(0, 10)]
      let [fiveMin, fiveMax] = [Math.min(a,b), Math.max(a,b)]

      [a, b] = [getRandonNumber(12,22), getRandonNumber(12, 22)]
      let [sixMin, sixMax] = [Math.min(a,b), Math.max(a,b)]

      return [ [oneMin, oneMax], [twoMin, twoMax], [threeMin, threeMax], [fourMin, fourMax], [fiveMin, fiveMax], [sixMin, sixMax], ]
    }

    const createDiaryData = async (userLen, idx, imgFile) => {
      const userid = getRandonNumber(1, userLen)
      const data = getDiaryData( userid , idx, imgFile) // userid
      const user = await User.findByPk(userid);
      return await user.createDiarie(data)
    }

    const user_len = 20
    const [imgArr , diary_len] = getImageFiles()
    await createUserData(user_len)
    for(let i = 0 ; i < imgArr.length ; i ++){
      imgArr[i].forEach( async imgFile => { 
        await createDiaryData(user_len, i, imgFile)
      })
    }
    // const diaryLikes = await Like.findAll({ where : { diarieId : 1 } })
    // const before = await diary.getLikes({ raw :true, nest : true })
    // console.log(before)

    // 연ㅕ 삭ㅔ 
    // await diary.removeLikes(diaryLikes)
    // const after = await diary.getLikes({ raw :true, nest : true })
    // console.log(after)

    // await diary.removeLikes(diaryLikes)
    // await diary.destroy()

    //실제 라이크 테블 
    // const result = await Like.findAll({ where : { diarieId : 1 }, raw : true, nest : true })
    // console.log(result)
  },
  down: async (queryInterface, Sequelize) => {
    /**
    // await diary.addHashtags(hashtags, { through : DiariesHashtag , ignoreDuplicates : true})
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('Diaries', null, {})

  }
};
    // let data ={
    //   image:"image" ,
    //   content:"content",
    //   weather: 'cloud',
    //   temp: 12,
    //   tempMax: 17,
    //   tempMin: 2 ,
    //   likeCounts: 0,
    //   share:  true ,
    // } 
    // let hashArr = ["짜자자asdfasdf", "adsf짬뽕", "크asdfsadf크"];
    // let hashtags = hashArr.map( (ele) => { 
    //   let obj = { name : ele }
    //   return obj
    // })
    // const diary = await Diarie.findByPk(11, { include : { model : Hashtag, through : {attributes:[]} }})   
    // console.log("original diary", JSON.stringify(diary))
    // const createHash = await Hashtag.bulkCreate(hashtags, { through : DiariesHashtag, ignoreDuplicates : true })
    // const foundHash = await Hashtag.findAll({ where : { name : hashArr} }) 
    // await diary.setHashtags(foundHash);
    // const getRe = await diary.getHashtags({through : { attributes : []}})
    // console.log("createdHash", JSON.stringify(createHash))
    // // console.log("foundHash", JSON.stringify(foundHash))
    // console.log("get diary hash after set", JSON.stringify(getRe) )
    // const found = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found))
    // await diary.addHashtag(foundHash)

    // const found2 = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found2))

    // return sequelize.transaction(function (t) {

        // const f = await Diarie.findByPk(221, { include : {model : Hashtag,  through : { attribuets : [] }} })
    // console.log(JSON.stringify(f))

    // const createdDiary = await Diarie.create(data)

    // return sequelize.transaction( (t) => { 
    //   return Hashtag.bulkCreate( hashtags, 
    //         { through : DiariesHashtag, ignoreDuplicates : true , transaction : t })
    //   .then( async createdHashtag => {
    //     console.log('created Hsh===', JSON.stringify(createdHashtag))
    //     const foundHash = await Hashtag.findAll({ where : { name : hashArr } })
    //     return createdDiary.setHashtags(foundHash, { transaction : t })
    //   })
    // })
    // .then( async finalResult => { 
    //   console.log(finalResult)
    // })
    // .catch( err => { 
    //   console.log(err)
    // })




    // let data ={
    //   image:"image" ,
    //   content:"content",
    //   weather: 'cloud',
    //   temp: 12,
    //   tempMax: 17,
    //   tempMin: 2 ,
    //   likeCounts: 0,
    //   share:  true ,
    // } 
    // let hashArr = ["짜자자asdfasdf", "adsf짬뽕", "크asdfsadf크"];
    // let hashtags = hashArr.map( (ele) => { 
    //   let obj = { name : ele }
    //   return obj
    // })
    // const diary = await Diarie.findByPk(11, { include : { model : Hashtag, through : {attributes:[]} }})   
    // console.log("original diary", JSON.stringify(diary))
    // const createHash = await Hashtag.bulkCreate(hashtags, { through : DiariesHashtag, ignoreDuplicates : true })
    // const foundHash = await Hashtag.findAll({ where : { name : hashArr} }) 
    // await diary.setHashtags(foundHash);
    // const getRe = await diary.getHashtags({through : { attributes : []}})
    // console.log("createdHash", JSON.stringify(createHash))
    // // console.log("foundHash", JSON.stringify(foundHash))
    // console.log("get diary hash after set", JSON.stringify(getRe) )
    // const found = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found))
    // await diary.addHashtag(foundHash)

    // const found2 = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found2))

    // return sequelize.transaction(function (t) {

        // const f = await Diarie.findByPk(221, { include : {model : Hashtag,  through : { attribuets : [] }} })
    // console.log(JSON.stringify(f))

    // const createdDiary = await Diarie.create(data)

    // return sequelize.transaction( (t) => { 
    //   return Hashtag.bulkCreate( hashtags, 
    //         { through : DiariesHashtag, ignoreDuplicates : true , transaction : t })
    //   .then( async createdHashtag => {
    //     console.log('created Hsh===', JSON.stringify(createdHashtag))
    //     const foundHash = await Hashtag.findAll({ where : { name : hashArr } })
    //     return createdDiary.setHashtags(foundHash, { transaction : t })
    //   })
    // })
    // .then( async finalResult => { 
    //   console.log(finalResult)
    // })
    // .catch( err => { 
    //   console.log(err)
    // })
