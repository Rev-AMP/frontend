import AuthActionTypes from "./action.types";

const initState = {
    accessToken: "",
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
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                accessToken: action.payload,
                isLoggedIn: true,
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return { ...state, isLoading: false, errorMessage: action.payload, accessToken: "", isLoggedIn: false };

        default:
            return state;
    }
};

export default loginReducer;
