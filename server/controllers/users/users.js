const { User } = require("../../models");
const { generateToken , sendToken } = require('../tokenfunction')
const { sendEmailCode } = require('../mailer')
require("dotenv").config();

module.exports = {
  // *  GET users/email
  checkEmail: async (req, res) => {
    // request query validation
    const { email } = req.query
    if( !email ){
      return res.status(422).send("Insufficient parameters");
    }
    // check the email conflict
    const found = await User.findOne({ 
      where : { email } 
    })
    .catch( err =>{
      return res.status(500).send("Internal server error")
    })
    // found=true : email exists 203 , found=false: email good to go 
    if(found) 
      return res.status(203).send("User found by email")

    const code = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    sendEmailCode(res, email,code)
      ? res.status(200).json({ code : code })
      : res.status(500).send("failed to send email")
  },


  // *  POST users/signin
  signin: async (req, res) => {
    // req.body validation
    if (!req.body.email || !req.body.password)
      return res.status(422).send("Insufficient parameters");

    const result = await User.findOne({
      where: { email: req.body.email },
    }).catch((err) => {
      // db error
      return res.status(500).send("Internal server error");
    });
    // user not found ==> email 존재 x 비회원 유저 로그인 시도
    if (!result) return res.status(403).send("Not Found"); // <-- API 확인

    // email & password 확인
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    // password 불일치
    if (!user) return res.status(401).send("Unauthorized");

    const { id, email } = user.dataValues; 
    const token = generateToken({ id, email });
    sendToken(res, token);
    return res.json({ email, token }); 
    //! accessToken 을 body에 안줘도 됨 ! 추후 다시 협의 보기
  },
  // *  POST users/signup
  signup: async (req, res) => {
    // req body validation
    const { email, password, userName, social, gender } = req.body;
    console.log(email, password, userName, social, gender)
    if (!email || !password || !userName || !gender)
      return res.status(422).send("Insufficient parameters");

    // validate to check duplicated
    const found = await User.findOne({ where: { email } })
    return found 
      ? res.status(403).send("Conflict") 
      : User.create({ 
          email, password, userName, social, gender
        })
      // not duplicated, Response Created or not 
      .then( created => {
        return !created
          ? res.status(500).send("Failed to create")
          : res.status(200).send("Created")
      })
      .catch(err => { // DB error to excute findOne 
        return res.status(500).send("Internal server Error")
      })
  },

  // *  POST users/signout
  signout: (req, res) => {
    console.log("its comming now")

    // res.clearCookie('jwt');
//	return res.json({ message: 'logout success' })
    res.clearCookie("Bearer", {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
      domain: "weadresser.ml"
    }).status(205).send('Logged out successfully') 
  },
};
