require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const session = require('express-session');
const indexRouter = require("./routers");
const cookieParser = require("cookie-parser");
//require("./models");
// const sequelize = require('Sequelize')

// const port = process.env.HTTP_PORT || 4000;
const PORT = 80;
const client = `${process.env.CLIENT_URL}` 
const test = `https://localhost:3000`
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: "saltkey",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://localhost:3000', 
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
  })
);
// app.use(cookieParser('abcd'));

app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello World"); // 일단 '/' 귀결되면 Hello world (just for 배포)
});

app.get("/check", (req, res) => {
  res.send("check point success");
});

// sequelize.sync({ force: false, alter: true }) // <- sequelize init 필요 ! (보류)
// let credentials ; // "여기에 AWS 키"
// let server;
// if(credentials){
// server = https.createServer(credentials, app);
// server.listen(port, () =>  console.log("httpSSS server running"))
// }
// else{
app.listen(PORT, () => console.log("http server running"));
// }
