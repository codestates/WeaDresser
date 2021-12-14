require("dotenv").config();

module.exports = {
  //! share false 교체해야함
  findLatestById: (userId, minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diariesId, A.image as diariesImage,A.likeWhether as likeWhether,
        A.createdAt as createdAt, A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.createdAt,
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts,
            CASE WHEN Likes.id is null then false else true end as likeWhether
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diariesId and Likes.userId = ${parseInt(userId)}
          )A 
        Left join Users B on A.diarayUserId = B.Id 
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = true AND A.diarayUserId = ${parseInt(userId)}
        Group by A.id, A.likeWhether) OOTD 
      where ${parseFloat(maxTem) - -20} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem) - 20} 
      ORDER BY OOTD.createdAt DESC
      LIMIT 1;
    `;
    return query
  },

  //! share false 교체해야함
  findTopLikeById :(userId, minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diariesId, A.image as diariesImage, A.likeWhether as likeWhether, 
          A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, 
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts,
              CASE WHEN Likes.id is null then false else true end as likeWhether
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diariesId and Likes.userId = ${parseInt(userId)}
          )A 
        Left join Users B on A.diarayUserId = B.Id 
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = true
        Group by A.id, A.likeWhether) OOTD 
      where ${parseFloat(maxTem)  - -20} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem) - 20} 
      ORDER BY OOTD.likeCounts DESC
      LIMIT 10;
    `;
    return query
  },

  findRandomOne : (minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diariesId, A.image as diariesImage, A.createdAt as createdAt,
          A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.createdAt,
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diariesId
          )A 
        Left join Users B on A.diarayUserId = B.Id 
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = true 
        Group by A.id) OOTD 
      where ${parseFloat(maxTem) - -20} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem) - 20} 
      ORDER BY rand()
      LIMIT 10
    `;
    return query
  },
  findTopLikeOne : (minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diariesId, A.image as diariesImage, A.createdAt as createdAt,
          A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.createdAt,
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diariesId
          )A 
        Left join Users B on A.diarayUserId = B.Id 
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = true 
        Group by A.id) OOTD 
      where ${parseFloat(maxTem)  - -20} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem) - 20} 
      ORDER BY OOTD.likeCounts DESC
      LIMIT 1;
    `;
    return query
  }

};
