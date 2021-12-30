require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const session = require('express-session');
const indexRouter = require("./routers");
const cookieParser = require("cookie-parser");

const PORT = 80;
const client = `${process.env.CLIENT_URL}` 
const test = `https://localhost:3000`
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  cors({
    // origin: ['https://localhost:3000', 'https://wwww.weadresser.ml','https://weadresser.ml'],
    origin: 'https://www.weadresser.ml',
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
  })
);

app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello World"); 
});

app.get("/check", (req, res) => {
  res.send("check point success");
});


app.listen(PORT, () => console.log("https server running"))
