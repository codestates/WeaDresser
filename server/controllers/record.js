const multer = require("multer");
const { isAuthorized } = require("./tokenfunction/index");
const { User, Diarie, Hashtag } = require("../models");
const { Cloud9 } = require("aws-sdk");

module.exports = {
  // * POST  /record
  create: async (req, res) => {
    // formData.append('weatherData', weatherData);
    //     formData.append('image', uploadImage);
    //     formData.append('content', inputContent);
    //     formData.append('hashtag', inputHashtag);
    //     formData.append('share', sharePost);

    const { content, hashtag, share, weatherData } = req.body;
    const accessTokenData = isAuthorized(req);

    if (!content || !share || !temp || !tempMax || tempMin) {
      res.status(400).json({ message: "input values" });
    }
    if (!accessTokenData) {
      res.status(401).json({ message: "unauthorized" });
    }
    // const insertTag = hashtag.map((ele) => {
    //   let obj = { name: ele };
    //   return obj;
    // });

    const data = await Diarie.findOne({ where: { userId } });
    if (!data) {
      if (content && hashtag && share && tempMin && tempMax && temp) {
        let img;
        if (!req.file.location) {
          img = null;
        } else {
          img = req.file.location;
        }
        const imageInfo = await Diarie.create({
          likeCounts: 1,
          weather: "cloud",
          userId,
          content,
          share,
          tempMin: 0,
          tempMax: 0,
          temp: 0,
          image: img,
        })
          .then(async (created) => {
            if (insertTag.length !== 0) {
              await Hashtag.bulkCreate(insertTag, { returning: true });
            }
            res.status(201).send();
          })

          .catch((err) => {
            console.log(err);
          });
      }
    }
  },
};
