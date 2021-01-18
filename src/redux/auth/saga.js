import AuthActionTypes from './action.types';
import { takeEvery, put, call } from 'redux-saga/effects';
import { LoginSuccess, LoginFailure } from './action';
import httpClient from 'services/http-client';

function* Login() {
    yield takeEvery(AuthActionTypes.LOGIN, function* (action) {
        let loginData = new FormData();
        loginData.append("username", action.payload.username);
        loginData.append("password", action.payload.password);
        try {
            const response = yield call(httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/login/access-token`, {
                method: "post",
                body: loginData
            });
            yield put(LoginSuccess(response.access_token));
        }
        catch (error) {
            yield put(LoginFailure(error.detail));
        }


    });
}


export default Login;