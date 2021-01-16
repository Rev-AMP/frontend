import AuthActionTypes from './action.types';
import { takeEvery, put } from 'redux-saga/effects';
import { LoginSuccess, LoginFailure } from './action';

function* Login() {
    yield takeEvery(AuthActionTypes.LOGIN, function* (action) {
        let loginData = new FormData();
        loginData.append("username", action.payload.username);
        loginData.append("password", action.payload.password);
        try {
            let accessToken = yield fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login/access-token`, {
                method: "post",
                body: loginData
            })
                .then(async response => {
                    const json = await response.json();
                    return response.ok ? json.access_token : Promise.reject(json);
                })
                .catch(error => {
                    throw error;
                })

            yield put(LoginSuccess(accessToken));
        }
        catch (error) {
            yield put(LoginFailure(error.detail));
        }


    });
}


export default Login;