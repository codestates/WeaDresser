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
export const TEMP_LOADING = "TEMP_LOADING";
export const MYPAGE_RECORD_DATA = "MYPAGE_RECORD_DATA";
export const SEARCH_OFFSET = "SEARCH_OFFSET"
export const NAV_TOP = "NAV_TOP"

export function loginSuccessHandler(boolean, accessToken) {
    return (dispatch) => {
        // console.log(boolean, accessToken)
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


export function getLocationData(lat, lot) {
    return (async dispatch => {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lot}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .catch(err => {
                console.log('err', err)
                dispatch(isLoadingHandler(false))
                dispatch(tempLoadingHandler(false))
            });
        if(result){
            console.log(result.data)
            const { coord, main, name, sys, weather } = result.data;
            dispatch(getWeatherData({ coord, main, name, sys, weather }))
            dispatch(tempLoadingHandler(true))
        }
    })
};


export function tempLoadingHandler(bool){
    return {
        type: TEMP_LOADING,
        payload : {
            tempLoading : bool 
        }
    }
}


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
    const SERVER = process.env.REACT_APP_SERVER || 'http://localhost:80'
    return (dispatch) => {
        return axios.post(
            SERVER + '/users/signup', 
            reqBody, 
            { withCredentials : true }
        )
        .then(result => {
            // console.log("then result ========", result);
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

export function setSearchOffsetHandler(data) {
    return{
        type: SEARCH_OFFSET,
        payload: {
            searchOffset: data
        }
    }
}

export function navTop(data){
    return{
        type: NAV_TOP,
        payload: {
            navTopLoc: data
        }
    }
}