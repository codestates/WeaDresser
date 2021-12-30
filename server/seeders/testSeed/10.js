
'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../models')
const { Op } = require('sequelize');
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [tempMin, tempMax] = [14, 14]
    try{
      await sequelize.transaction( async t => { 
        // get Most like diary with username
        const userId = 17
        // const TopOne = await Diarie.findOne({
        //   where : { 
        //     temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
        //     share : true,
        //   },
        //   include : [ 
        //     { model : User, attributes : ['userName'] },
        //     { model : Hashtag, through : {attributes : []} },
        //   ],
        //   order: [['likeCounts', 'DESC']],
        //   limit : 1, 
        //   nest : true,
        //   transaction : t
        // })
        // // like condition for current user on found diary                
        // let topData = TopOne.dataValues
        // topData.hashtag = topData.Hashtags.map(hash => hash.dataValues.name).join(', ')
        // topData.likeWhether = await Like.findOne({ where : 
        //   { diarieId : TopOne.id, userId : userId},
        //   transaction : t
        // }) ? 1 : 0 
    
        // // data setting for hashtags, username 
        // topData.userName = topData.User.dataValues.userName
        // delete topData.Hashtags
        // delete topData.User
        // console.log(topData)
        // found user Diary 
        let userData ;
        const UserOne = await Diarie.findOne({
          where : {
            id : userId, 
            temp : { [Op.between] : [ tempMin -500, tempMax + 500 ] },
            share : true,
          },
          include : [ 
            { model : User, attributes : ['userName'] },
            { model : Hashtag, through : {attributes : []} },
          ],
          order: [['CreatedAt', 'DESC']],
          limit : 1, 
          nest : true,
          raw: true, 
          transaction : t,
        })
        console.log(UserOne)
      //   // if user has diary on that condition where temperature in between tempMin, Max
      //   // console.log(UserOne)
      //   if(UserOne){ 
      //   // like condition for current user on found diary  
      //     console.log("=================================================================",UserOne.hashtag)              
      //     userData = UserOne.dataValues
      //     userData.hashtag = userData.Hashtags.map(hash => hash.dataValues.name).join(', ')
      //     userData.likeWhether = await Like.findOne({ where : 
      //       { diarieId : UserOne.id, userId : userId},
      //       transaction : t
      //     }) ? 1 : 0 
    
      //   }
      //   else{ 
      //   // find random diary 
      //     const RanOne = await Diarie.findOne({
      //       where : { 
      //         temp : { [Op.between] : [ tempMin -200, tempMax + 200 ] },
      //         share : true,
      //       },
      //       include : [ 
      //         { model : User, attributes : ['userName'] },
      //         { model : Hashtag, through : {attributes : []} },
      //       ],
      //       order: sequelize.literal('rand()'),
      //       limit : 1, 
      //       nest : true,
      //       transaction : t
      //     })
      //     // like condition for current user on found diary                
      //     userData = RanOne.dataValues
      //     userData.likeWhether = await Like.findOne({ where : { 
      //       diarieId : RanOne.id, userId : userId
      //     },
      //     transaction : t
      //     }) ? 1 : 0 
      //   }
    
      //   // data setting for hashtags, username 
      //   userData.hashtag = userData.Hashtags.map(hash => hash.dataValues.name).join(', ')
      //   userData.userName = userData.User.dataValues.userName
      //   delete userData.Hashtags
      //   delete userData.User
        
      //   // console.log(topData)
      //   return res.json([userData, topData])
      // })
    })
  }catch(err) { 
      console.log(err)
      // return res.status(500).send("Internal server error")
    }
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
