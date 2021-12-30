'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../../models')
const { Op } = require('sequelize');
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let imgArr = []
    let lenArr = []
    const path = fs.readdirSync(__dirname + "/image")
    path.forEach(dir => {
      if(dir === '.DS_Store') continue
      const nnon = fs.readdirSync(__dirname + "/image/" + dir)
      imgArr.push(nnon)
      lenArr.push(...nnon)
    });

    imgArr.forEach(element => {

    });
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

    // .filter(file => {
    //   return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    // })
    // .forEach(file => {
    //   const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //   db[model.name] = model;
    // });

    return queryInterface.bulkDelete('Hashtags', null, {})

  }
};
