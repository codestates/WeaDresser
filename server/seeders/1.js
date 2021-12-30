'use strict';
const { User } = require('../models')
const { userLen, nameArr, getRandonNumber, getImageFiles } = require('./const')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const getDiaryData = (userid, idx, img) => {
      const arr = [ [0, 20], [0, 15], [0, 10], [12, 10] ]
      let minus = idx < 2 ? -1 : 1 ;
      let [a, b] = [ minus * getRandonNumber(arr[idx][0], arr[idx][1]),  minus * getRandonNumber(arr[idx][0], arr[idx][1]) ] 
      const maxT = Math.max(a,b)      
      const minT = Math.min(a,b)     
      const yesterday = ( d => new Date(d.setDate(d.getDate()-getRandonNumber(0,5))) )(new Date);

      return {
        image : "https://s3.us-east-2.amazonaws.com/gathercoding.co/" + (img),
        content : 'dummy content' + (userid),
        weather : 'weather' + (userid),
        temp : (maxT + minT)/2, 
        tempMax : maxT, 
        tempMin : minT,
        share : true,
        userId : userid,
        likeCounts : 0,
        createdAt : yesterday + (getRandonNumber(1,3))*(-1)
      }
    }
    const createUserData = async (userLen) => {
      const userData = new Array(userLen ).fill(0).map( (ele, idx) => {
        const name = nameArr[idx] ? nameArr[idx] : nameArr[getRandonNumber(0,10)]
        // console.log(name)
        const data =   { 
          userName : name,
          email : `abc${idx+1}@email.com`,
          password : `1234`,
          gender : getRandonNumber(0,100)%2 ? 'male' : 'female',
          social : false,
        }
        return data
      })
      return await queryInterface.bulkInsert( 'Users' ,userData, { returning : true })
    }

    const createDiaryData = async (userLen, idx, imgFile) => {
      const userid = getRandonNumber(1, userLen)
      const data = getDiaryData( userid , idx, imgFile) // userid
      const user = await User.findByPk(userid);
      return await user.createDiarie(data)
    }

    const [imgArr , diary_len] = getImageFiles()
    await createUserData(userLen)
    for(let i = 0 ; i < imgArr.length ; i ++){
      imgArr[i].forEach( async imgFile => { 
        await createDiaryData(userLen, i, imgFile)
      })
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('Diaries', null, {})
  }
};
