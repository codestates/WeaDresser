'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../../models')
const { Op } = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await sequelize.transaction( async t => { 
        // get Most like diary with username
        const [ tempMax, tempMin] = [-10, -11] 
        const TopOne = await Diarie.findOne({
          where : { 
            temp : { [Op.between] : [ tempMin -10, tempMax + 10 ] }
          },
          include : [ 
            { model : User, attributes : ['userName'] },
            { model : Hashtag, through : {attributes : []} },
          ],
          order: [['likeCounts', 'DESC']],
          limit : 1, 
          nest : true,
          transaction : t
        })
        // data setting for hashtags, username 
        let topData = TopOne.dataValues
        topData.hashtag = topData.Hashtags.map(hash => hash.dataValues.name).join(', ')
        topData.userName = topData.User.dataValues.userName
        delete topData.Hashtags
        delete topData.User

        // to give current users info wether he liked the diary or not         
        const userId = 10 
        topData.likeWether = await Like.findOne({ where : { 
          diarieId : topData.id, userId : userId
         },
         transaction : t
        }) ? 0 : 1 
        console.log(topData)
      })
    }
    catch(err) { 
      console.log(err)
    }

    // const hasharr = foundHash.map( (ele, idx) =>  ele.name ).join(', ') 
    // TopOne.likeWhether = foundLikes.length
    // TopOne.dataValues.userName = TopOne.dataValues.User.dataValues.userName
    // console.log(TopOne.dataValues.Hashtags)
  },
  down: async (queryInterface, Sequelize) => {
    // where : { 
    //   userId : foundUser.id,
    //   createdAt : { [Op.like] : curDate } 
    // }, 
    // include : { 
    //   model : Hashtag, 
    //   through : {attributes :[]},
    //   attributes : ['name'],
    //   raw:true
    // },
    // order : [['createdAt', 'DESC']], 
    return queryInterface.bulkDelete('Hashtags', null, {})

  }
};
