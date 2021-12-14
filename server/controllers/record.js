const multer = require("multer");
const { isAuthorized } = require("./tokenfunction/index");
const { User, Diarie, Hashtag } = require("../models");

module.exports = {
  // * POST  /record
  create: async (req, res) => {
    // formData.append('weatherData', weatherData);
    //     formData.append('image', uploadImage);
    //     formData.append('content', inputContent);
    //     formData.append('hashtag', inputHashtag);
    //     formData.append('share', sharePost);

    const { userId, content, hashtag, share, tempMin, tempMax, temp } =
      req.body;
    const userInfo = isAuthorized(req);
    const validUser = await isValid(userInfo.email, userInfo.id);
    if (!validUser) {
      return res.status(404).json("not authorized!");
    }
    const insertTag = hashtag.map((ele) => {
      let obj = { name: ele };
      return obj;
    });

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
          content,
          share,
          tempMax,
          tempMax,
          temp,
          image: img,
        }).then(async (created) => {
          if (insertTag.length !== 0) {
            await Hashtag.bulkCreate(insertTag, { returning: true });
          }
        });
      }
    }
  },
};
