import axios from "axios";
require("dotenv").config();

//!Todo Client id, Secret key,숨기기
const getGoogleAccToken = () => {
  const client_id =
    process.env.REACT_APP_KEY_GOOGLE ||
    "218465323122-rtk87nvtaj2j5qmdg72qvas9sj81jee0.apps.googleusercontent.com";
  const redirect_uri = process.env.REACT_APP_REDIRECT_URL;
  const google = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  window.location.assign(google);
};

const getGoogleUserInfo = async ({ accessToken }) => {
  const googleData = await axios
    .get(
      "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
        accessToken,
      {
        headers: {
          authorization: `token ${accessToken}`,
          accept: "application/json",
        },
      }
    )
    .catch((err) => {
      console.log(err);
      return { isSuccess: false, accessToken: null, msg: "Server error" };
    });
  return googleData
    ? { isSuccess: true, data: googleData.data, msg: "Success" }
    : { isSuccess: false, data: null, msg: "Bad Requset" };
};

const getKakaoCode = () => {
  const client_id =
    process.env.REACT_APP_KEY_KAKAO || "1790cb63ae07847a0629b8b85b1bc2c6";
  const redirect_uri =
    process.env.REACT_APP_REDIRECT_URL || "https://localhost:3000";
  const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  window.location.assign(kakao);
};

const getKakaoAccToken = async (kakaoCode) => {
  const client_id =
    process.env.REACT_APP_KEY_KAKAO || "1790cb63ae07847a0629b8b85b1bc2c6";
  const client_secret =
    process.env.REACT_APP_KAKAO_SECRET || "LZl1ctF5A55MsMTwjxUSGioxXtWO5abm";
  const kakaoUrl = `https://kauth.kakao.com/oauth/token?code=${kakaoCode}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=https://localhost:3000&grant_type=authorization_code`;
  const data = await axios
    .post(
      kakaoUrl,
      { headers: { accept: `application/x-www-form-urlencoded` } },
      { property_keys: ["kakao_account.email"] }
    )
    .catch((err) => {
      console.log(err);
      return { isSuccess: false, accessToken: null, msg: "Server error" };
    });
  // console.log(data)
  return data
    ? { isSuccess: true, accessToken: data.data.access_token, msg: "Success" }
    : { isSuccess: false, accessToken: null, msg: "Bad Request" };
};

const getUserAccToken = (loginInfo) => {
  const { email, password } = loginInfo;
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/users/signin`,
      { email, password },
      { withCredentials: true }
    )
    .then((data) => {
      // console.log(data)
      return [true, data.data.accessToken, "Success"];
    })
    .catch((err) => {
      // console.log(err.response)
      return err.response.status === 401
        ? [false, null, "이메일 과 비밀번호를 다시 확인해 주세요"]
        : [false, null, "Server error"];
    });
};

export {
  getGoogleAccToken,
  getGoogleUserInfo,
  getKakaoCode,
  getKakaoAccToken,
  getUserAccToken,
};
