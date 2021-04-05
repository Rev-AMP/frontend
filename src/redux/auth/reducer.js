import AuthActionTypes from "./action.types";

const initState = {
    accessToken: "",
    refreshToken: "",
    expiry: null,
    errors: [],
    isLoggedIn: false,
    isLoading: false,
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                isLoading: true,
                errors: [],
                isLoggedIn: false,
                accessToken: "",
                refreshToken: "",
                expiry: null,
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                isLoading: false,
                errors: [],
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                expiry: action.payload.expiry,
                isLoggedIn: true,
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                isLoading: false,
                errors: action.payload,
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
