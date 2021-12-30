'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../../models')
const { Op } = require('sequelize');
const users = require('../../controllers/mypage/users');
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // const like = await Like.findAll({ where : {  userId : 11 } })
    const user = await User.findByPk(1)
    await user.destroy();    
    // await user.removeLikes(like)
    // await user.save();
  },
  down: async (queryInterface, Sequelize) => {
    // where : { 
    //   userId : foundUser.id,    //   createdAt : { [Op.like] : curDate } 
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
