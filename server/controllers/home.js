const { sequelize } = require('../models')
const { isAuthorized, isValid } = require("./tokenfunction/index");
const { findTopLikeById, findLatestById, findRandomOne, findTopLikeOne } = require('./query/query')
module.exports = {
  // * GET  /?tempMin={}&tempMax={}
  findRandom : async (req, res) => {
    const { tempMin, tempMax } = req.query;

    const randomQuery = findRandomOne(tempMin, tempMax);
    const topQuery = findTopLikeOne(tempMin, tempMax);
   
    return sequelize.query( randomQuery, { raw : true })
      .then( async randomFound => {
        // random one found OK
        if(randomFound[0].length > 0){
          const topOne = await sequelize.query( topQuery, { raw : true })
          return topOne[0].length > 0 // most like found OK
            ? res.status(200).json([ randomFound[0][0], topOne[0][0] ])
            : res.status(201).json([ randomFound[0][0], null ]) 
            //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
        }        
        else{ // !no random => nodata ? x
          const topOne = await sequelize.query( topQuery, { raw : true })
          return topOne[0].length > 0
          ? res.status(202).json([ null, topOne[0][0] ])
          : res.status(404).json([ null, null ]) 
          //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
        }
      })
      .catch( err => {
        //!Todo error handlring (DB query => too much request,then server will break )
        console.log(err)
        return res.status(500).send("Internal Server err") 
      })    
  }, 

  // * GET  /user/?userId={}&tempMax={}&tempMin={}  
  findById : async (req, res) => {
    
    const { tempMax, tempMin }= req.query
    const userInfo = isAuthorized(req);
    const validUser = await isValid(userInfo.email, userInfo.id);
    if(!validUser){
      return res.status(404).json("not authorized!");
    }

    const userQuery = findLatestById(validUser.dataValues.id, tempMin, tempMax) // leftOne
    const topQuery = findTopLikeById(validUser.dataValues.id, tempMin, tempMax); // rightOne

    // find one by userId
    return sequelize.query( userQuery, { raw: true } )
      .then(  async userOne => { 
        //  found user one OK 
        if(userOne[0].length > 0){ 
          const topOne = await sequelize.query( topQuery, { raw : true }) 
          // found most like OK
          return topOne[0].length > 0
          ? res.status(200).json([ userOne[0][0], topOne[0][0] ]) 
          : res.status(201).json([ userOne[0][0], null ]) 
          //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
        }     
        else{ // not any from user
          // * user data 없을 수 있음 
          const randomQuery = findRandomOne(tempMin, tempMax);
          // find random one  
          return sequelize.query( randomQuery, { raw : true })
          .then( async randomFound => {
            if(randomFound[0].length > 0){
              // find one by most like
              const topOne = await sequelize.query( topQuery, { raw : true })
              // both OK
              return topOne[0].length > 0  
                ? res.status(200).json([ randomFound[0][0], topOne[0][0] ])
                : res.status(201).json([ randomFound[0][0], null ])  
                // random one OK  not found of the most like
                //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
            }        
            else{ //! no random ? => no data x  
              const topOne = await sequelize.query( topQuery, { raw : true })
              return topOne[0].length > 0
                // only most like one OK 
                ? res.status(202).json([ null, topOne[0][0] ])
                : res.status(404).json([ null, null ]) 
                // no random, no most like
              //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
            }
          })
      }
    })
    .catch(err => {
      return res.status(500).send("Internal server err")
    }) 
  }
}
