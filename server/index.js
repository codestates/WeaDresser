require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const session = require("express-session");
const indexRouter = require("./routers");
const cookieParser = require("cookie-parser");
//require("./models");
// const sequelize = require('Sequelize')

// const port = process.env.HTTP_PORT || 4000;
const PORT = 80;
const client = `${process.env.CLIENT_URL}`;
const test = `https://localhost:3000`;
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
    origin: client,
    // origin : true,
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

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log("httpss server runnning"));
} else {
  server = app.listen(PORT, () => console.log("http server running"));
}
