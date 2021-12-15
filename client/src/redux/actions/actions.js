import axios from "axios";
export const IS_LOGIN = 'IS_LOGIN';
export const IS_LOADING = 'IS_LOADING';
export const IS_SHOW_LOGIN_MODAL = "IS_SHOW_LOGIN_MODAL";
export const IS_SHOW_SIGNUP_MODAL = "IS_SHOW_SIGNUP_MODAL";
export const IS_SHOW_OOTD_IMAGE_MODAL = "IS_SHOW_OOTD_IMAGE_MODAL";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const WEATHER_DATA = "WEATHER_DATA";
export const IS_SHOW_SIDE_BAR = "IS_SHOW_SIDE_BAR";
export const IS_SHOW_DATE_PICKER = "IS_SHOW_DATE_PICKER";
export const DATE_DATA = "DATE_DATA";
export const MYPAGE_RECORD_DATA = "MYPAGE_RECORD_DATA";

export function loginSuccessHandler(boolean, accessToken) {
    return (dispatch) => {
        console.log(boolean, accessToken)
        dispatch(isLoginHandler(boolean))
        dispatch(setAccessToken(accessToken))
    }
}

export function isLoginHandler (boolean) {
    return {
        type : IS_LOGIN,
        payload : {
            isLogin : boolean
        }
    }
};
export function isLoadingHandler (boolean) {
    return {
        type : IS_LOADING,
        payload : {
            isLoading : boolean
        }
    }
}
export function isShowLoginModalHandler (boolean) {
    return {
        type : IS_SHOW_LOGIN_MODAL,
        payload : {
            isShowLoginModal : boolean
        }
    }
};
export function isShowSignUpModalHandler (boolean) {
    return {
        type : IS_SHOW_SIGNUP_MODAL,
        payload : {
            isShowSignUpModal : boolean
        }
    }
};
export function isShowOotdImageModalHandler(boolean){
    return {
        type: IS_SHOW_OOTD_IMAGE_MODAL,
        payload: {
            isShowOotdImageModal: boolean
        }
    }
}
export function setAccessToken(accessToken) {
    return {
        type : ACCESS_TOKEN,
        payload: {
            accessToken: accessToken
        }
    }
};
// export function getLocationData(lat, lot) {
//     return (async dispatch => {
//         const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lot}&appid=${process.env.REACT_APP_API_KEY}`)
//             .catch(err => console.log('err', err));
//         const { coord, main, name, sys, weather } = result.data;
//         dispatch(getWeatherData({ coord, main, name, sys, weather }))
//     })
// };
export function getWeatherData(data) {
    return {
        type : WEATHER_DATA,
        payload: {
            coord: data.coord,
            main: data.main, 
            name: data.name, 
            sys: data.sys,
            weather: data.weather
        }
    }
};
export function sideBarHandler(boolean){
    return{
        type: IS_SHOW_SIDE_BAR,
        payload: {
            isShowSideBar : boolean
        }
    }
}

export function createUserHandler(endpoint, reqBody){
    // const SERVER = process.env.REACT_APP_SERVER || 'http://localhost:80'
    const SERVER ='http://localhost:80/'
    console.log("asdf====================================",SERVER+endpoint)
    console.log("asdf====================================",reqBody)
    return (dispatch) => {
        return axios.post(
            'http://localhost:80/users/signup', 
            reqBody, 
            { withCredentials : true }
        )
        .then(result => {
            console.log("then result ========", result);
            dispatch(isShowLoginModalHandler(true));
            dispatch(isShowSignUpModalHandler(false));
        })
        .catch(err => {
            console.log("catch errorrrr========", err.response)
        })
    }

}

export function datePickerHandler(boolean){
    return{
        type: IS_SHOW_DATE_PICKER,
        payload: {
            isShowDatePicker : boolean
        }
    }
}

export function getDateData(data) {
    return{
        type: DATE_DATA,
        payload: {
            dateData : data
        }
    }
}

export function recordDataHandler(data) {
    return{
        type: MYPAGE_RECORD_DATA,
        payload: {
            data
        }
    }
}