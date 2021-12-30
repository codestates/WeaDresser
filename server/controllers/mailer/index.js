require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = {
  sendEmailCode : async (res, userEmail, code) => {
    const emailToSend = userEmail || "minchjung@gmail.com" 
    const contentData = {
      from : 'weadresser@gmail.com',
      to : emailToSend, 
      subject : "Weadresser 회원 가입  인증 코드 발송 ",
      text: `아래의 코드를 입력해 WeaDresser 가입 인증을 완료해 주세요
       Code : ${code}`
    }
    
    const transporter = nodemailer.createTransport({ 
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID, // generated ethereal user
        pass: process.env.MAIL_PASSWORD // generated ethereal password
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
