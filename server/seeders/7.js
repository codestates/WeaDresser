'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../models')
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
            { model : User, attributes : ['userName'] }
          ],
          order : [['likeCounts','DESC']],
          limit : 1, 
          raw: true, nest : true,
          transaction : t
        })
        // get same one to find hashtags all to set appropiate parsing data 
        const diary = await Diarie.findByPk(TopOne.id, { transaction : t })
        const foundHash = await diary.getHashtags({ 
          through : { attributes : [] }, 
          attributes : ['name'], 
          raw : true, nest : true, 
          transaction : t
        })
        // hash array to hash string with , comma 
        const hashtag = foundHash.map( ele => ele.name).join(',')
        TopOne.hashtag = hashtag 
        // to give current users info wether he liked the diary or not         
        const userId = 10 
        TopOne.likeWether = await Like.findOne({ where : { 
          diarieId : TopOne.id, userId : userId
         },
         transaction : t
        }) ? 0 : 1 
        console.log(TopOne)
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
