const { User, Diarie, Like, sequelize } = require("../../models");
const { isAuthorized } = require("../tokenfunction/index");

module.exports = {
  // * GET mypage/users
  findOne: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(401).send("not authorized");
    }

    const userInfo = await User.findOne({
      where: {
        email: accessTokenData.email,
      },
    }).catch((err) => {
      console.log(err);
    });
    //console.log(userInfo);

    res.status(200).send({ data: { userName: userInfo.userName, social: userInfo.social } });
  },
  // * PATCH mypage/users
  update: async (req, res) => {
    // console.log(req.body)
    // console.log(req.headers)
    const { password, editPassword, userName } = req.body;
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).send("not authorized");
    }

    const checkUserPassword = await User.findOne({
      where: {
        email: accessTokenData.email,
        password: password,
      },
    }).catch((err) => {
      console.log(err);
    });
    // if (checkUserPassword) {
    //   if (accessToken.id !== checkUserPassword.id) {
    //     return res.status(400).send("password id already exitst");
    //   }
    // }
    let result;
    if (!checkUserPassword) {
      return res.status(401).send("not authorized");
    }
    if (userName && !editPassword) {
      // console.log(userName)
      result = await User.update({userName: userName},{
        where: {
          email: accessTokenData.email,
        }
      }).catch((err) => {
        console.log(err);
      });
    } else if (!userName && editPassword) {
      result = await User.update({password: editPassword,},{
        where: {
          email: accessTokenData.email,
        }
      }).catch((err) => {
        console.log(err);
      });
    } else if (userName && editPassword) {
      result = await User.update({password: editPassword,userName: userName,},{
        where: {
          email: accessTokenData.email,
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    res.status(201).send("info change success");
  },
  // * DELETE  mypage/users 회원탈퇴
  delete: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData)  return res.status(401).send("not authorized");
    
    try{
      await sequelize.transaction( async t => { 
        const user = await User.findByPk(accessTokenData.id, { transaction : t });
        await user.removeDiaries(await user.getDiaries({ transaction : t }));
        await user.removeLikes(await user.getLikes({ transaction : t }));
        await user.destroy({ transaction : t });

        res
        .clearCookie("Bearer", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          domain: "weadresser.ml",
        })
        .status(200)
        .send("ok");
      })
    }
    catch(err){
      console.log(err)
      return res.status(500).send("Internal server error")       
    }
  },
};
