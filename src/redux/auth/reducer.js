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
                ...state,
                isLoading: true,
                errorMessage: "",
                isLoggedIn: false,
                accessToken: "",
                refreshToken: "",
                expiry: null,
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                expiry: new Date(action.payload.expiry * 1000),
                isLoggedIn: true,
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
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
