export const initialState = {
    isLogin : {
        isLogin : false,
        accessToken : "",
    },
    isLoading : { 
        isLoading : false //<-- 바꾼거 말하기 !
    },
    modal : {
        isShowLoginModal : false, 
        isShowSignUpModal : false,
        isShowOotdImageModal : false,
    },
    // isShowLoginModal: {
    //     isShowLoginModal : false
    // },
    // isShowSignUpModal: {
    //     isShowSignUpModal: false
    // },
    // accessToken: {
    //     accessToken: ''
    // },
    weatherData: 
    {
        coord: null,
        main: null, 
        name: null, 
        sys: null,
        weather: null
    },
    isShowSideBar: {
        isShowSideBar: false
    },
    isShowDatePicker: {
        isShowDatePicker: false
    },
    getDateData: {
        getDateData: null
    },
    getRecordData: {
        getRecordData: null,
    }
}