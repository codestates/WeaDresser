const { User } = require("../../models");
require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // helpFunctions for jsonwebtoken
  generateToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },

  sendToken: (res, token) => {
    res.cookie("Bearer", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 24 * 1000,
      domain: "weadresser.ml",
      path: "/"
    });
    // res.cookie("Login", "true", {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 60 * 60 * 24 * 1000,
    //   domain: "localhost",
    //   path: "/",
    //   ovewrite: true,
    //   signed : true
    // });
  },

  isAuthorized: (req) => {

    const cookieToken = req.cookies.Bearer;
    if (!cookieToken) return null;
    try {
      return verify(cookieToken, process.env.ACCESS_SECRET);

    } catch (err) {
      // return null if invalid token
      return null;
    }
  },

  isValid: (email, id) => {
    const validUser = User.findOne({where: {email: email, id: id}})
    try{
      return validUser;
    }
    catch(err) {
      return false;
    }
    
  }
};
