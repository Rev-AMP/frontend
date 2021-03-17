import { takeEvery, put, call } from "redux-saga/effects";

import AuthActionTypes from "./action.types";
import { loginSuccess, loginFailure } from "./action";
import { httpClient } from "services/http-client";

function* login() {
    yield takeEvery(AuthActionTypes.LOGIN, function* (action) {
        let loginData = new FormData();
        loginData.append("username", action.payload.username);
        loginData.append("password", action.payload.password);
        try {
            const response = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/login/access-token`, {
                method: "POST",
                body: loginData,
            });
            yield put(loginSuccess(response));
        } catch (error) {
            yield put(loginFailure(error.detail));
        }
    });
}

export default login;
