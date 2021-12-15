require('dotenv').config();
const nodemailer = require('nodemailer');


// const transporter = nodemailer.createTransport({ 
//   host: "smtp.mailtrap.io",
//   auth: {
//     user: "5130552df43c6f", // generated ethereal user
//     pass: "7e64240ce0f912", // generated ethereal password
//   }
// })


module.exports = {
  sendEmailCode : async (res, userEmail, code) => {
    const emailToSend = userEmail || "minchjung@gmail.com" 
    const contentData = {
      from : 'weadresser@gmail.com',
      to : emailToSend, 
      subject : "Weadresser 회원 가입  인증 코드 발송 ",
      text : `generating Code, 아래의 코드를 입력해 인증을 완료해 주세요
       Code : ${code}`
    }
    
    const transporter = nodemailer.createTransport({ 
      service: "gmail",
      auth: {
        user: "weadresser@gmail.com", // generated ethereal user
        pass: "qwer1234$#@!", // generated ethereal password
      }
    })

    return await transporter.sendMail(contentData, (err, info) => {
        if(err) return false 
        else{
          console.log('email sent', info);
          return true 
        }
    })
  }
}
