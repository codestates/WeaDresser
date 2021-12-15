const { Diarie, DiariesHashtag, Hashtag } = require("../../models");
const { isAuthorized, isValid } = require("../tokenfunction/index");

module.exports = {
  // * GET mypage/diary
  findOne: async (req, res) => {
    const createdAt = req.query;
    const accessToken = isAuthorized(req);
    const validUser = await isValid(accessToken.email, accessToken.id);
    if(!validUser){
      return res.status(401).json("not authorized!");
    }
    try {
      const create = await Diarie.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (createdAt === create) {
        const data = await Diarie.findOne({
          where: {
            id,
          },
          include: [
            {
              model: DiariesHashtag,
              as: "H",
              attributes: ["hashtagsId"],
            },
          ],
        });
        res.status(200).send({
          contnet: data.contnet,
          image: data.image,
          weather: data.weather,
          tempMin: data.tempMin,
          temMax: data.tempMax,
          hashtag: data.hashtagsId,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  // * GET  mypage/diary:createdAt
  findOnebyDate: async (req, res) => {
    // const { id } = req.params;
    // const createdAt = req.body;
    // const accessToken = isAuthorized(req);
    // if (!accessToken) {
    //   return res.status(401).send("not authorized");
    // }
    // try {
    //   const create = await Diarie.findOne({
    //     where: { createdAt: createdAt },
    //   });
    //   if (create) {
    //     const data = await Diarie.findOne({
    //       where: {
    //         id,
    //       },
    //       include: [
    //         {
    //           model: DiariesHashtag,
    //           as: "H",
    //           attributes: ["hashtagsId"],
    //         },
    //       ],
    //     });
    //     res.status(200).send({
    //       contnet: data.contnet,
    //       image: data.image,
    //       weather: data.weather,
    //       tempMin: data.tempMin,
    //       temMax: data.tempMax,
    //       hashtag: data.ashtagsId,
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  },
  // * PATCH mypage/diary
  update: async (req, res) => {
    // const { diaryid } = req.params;
    // const { content, image, share, hashtag } = req.body;
    // const accessToken = isAuthorized(req);
    // if (!accessToken) {
    //   return res.status(401).send("not authorized");
    // }
    // const diaryId = await Diarie.findOne({
    //   where: {
    //     userId: accessToken.id,
    //     content: content,
    //     image: image,
    //     share: share,
    //   },
    // }).catch((err) => {
    //   console.log(err);
    // });
    // const hashtagId = await DiariesHashtag.findOne({
    //   where: {
    //     diariesId: diaryId.userId,
    //     hashtagsId: hashtag,
    //   },
    // });
    // await Diarie.update(
    //   {
    //     content: content,
    //     image: image,
    //     share: share,
    //   },
    //   {
    //     where: {
    //       id,
    //     },
    //   }
    // );
  },
  // * DELETE  mypage/diary (게시글 삭제)
  delete: async (req, res) => {
    // const { diaryid } = req.params;
    // const accessToken = isAuthorized(req);
    // if (!accessToken) {
    //   return res.status(401).send("not authorized");
    // }
    // const diaryId = await Diarie.findOne({
    //   where: {
    //     id: diaryid,
    //     userId: accessToken.id,
    //   },
    // }).catch((err) => {
    //   console.log(err);
    // });
    // if (!diaryId) {
    //   res.status(400).send("not found data");
    // } else {
    //   await Diarie.destroy({
    //     where: {
    //       id: diaryid,
    //     },
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    //   res.status(200).send("delete diary");
    // }
  },
};
