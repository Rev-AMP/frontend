import AuthActionTypes from "./action.types";

const initState = {
    accessToken: "",
    refreshToken: "",
    expiry: null,
    errorMessage: "",
    isLoggedIn: false,
    isLoading: false,
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                isLoading: true,
                errorMessage: "",
                isLoggedIn: false,
                accessToken: "",
                refreshToken: "",
                expiry: null,
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                isLoading: false,
                errorMessage: "",
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                expiry: action.payload.expiry,
                isLoggedIn: true,
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                isLoading: false,
                errorMessage: action.payload,
                accessToken: "",
                refreshToken: "",
                expiry: null,
                isLoggedIn: false,
            };

        default:
            return state;
    }
};

export default loginReducer;
