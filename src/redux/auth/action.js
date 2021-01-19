import AuthActionTypes from './action.types';
export const Login = (user) => ({
    type: AuthActionTypes.LOGIN,
    payload: user
});

export const LoginSuccess = (accessToken) => ({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: accessToken
});

export const LoginFailure = (error) => ({
    type: AuthActionTypes.LOGIN_FAILURE,
    payload: error
});
export const ClearLoginError = () => ({
    type: AuthActionTypes.CLEAR_LOGIN_ERROR
});
export const LogOut = () => ({
    type: AuthActionTypes.LOGOUT
});

export const LogOutSuccess = () => ({
    type: AuthActionTypes.LOGOUT_SUCCESS
});
