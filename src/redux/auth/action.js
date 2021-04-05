import AuthActionTypes from "./action.types";

export const login = (user) => ({
    type: AuthActionTypes.LOGIN,
    payload: user,
});

export const loginSuccess = (tokens) => ({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: tokens,
});

export const loginFailure = (errors) => ({
    type: AuthActionTypes.LOGIN_FAILURE,
    payload: errors,
});

export const logout = () => ({
    type: AuthActionTypes.LOGOUT,
});
