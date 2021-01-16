import LoginActionTypes from './action.types';
export const Login= (user) => ({
    type:LoginActionTypes.LOGIN,
    payload:user
});

export const LoginSuccess = (accessToken) => ({
    type:LoginActionTypes.LOGIN_SUCCESS,
    payload:accessToken
});

export const LoginFailure = (error) => ({
    type:LoginActionTypes.LOGIN_FAILURE,
    payload:error
});
export const ClearLoginError = () => ({
    type:LoginActionTypes.CLEAR_LOGIN_ERROR
});
export const LogOut = () => ({
    type:LoginActionTypes.LOGOUT
});

export const LogOutSuccess = () => ({
    type:LoginActionTypes.LOGOUT_SUCCESS
});
