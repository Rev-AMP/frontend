import { all, call, put, select, takeEvery } from "redux-saga/effects";

import UserActionTypes from "./action.types";
import {
    FetchUserMeFailure,
    FetchUserMeSuccess,
    FetchUserFailure,
    FetchUserSuccess,
    FetchUsersSuccess,
    FetchUsersFailure,
    UpdateUserSuccess,
    UpdateUserFailure,
    CreateUserSuccess,
    CreateUserFailure
} from "./action";
import httpClient from "services/http-client";

function* FetchUserMe() {
    yield takeEvery(UserActionTypes.FETCH_USER_ME, function* () {
        try {
            let token = yield select((state) => state.auth.accessToken);
            let user = yield call(httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                }
            );

            yield put(FetchUserMeSuccess(user));
        }
        catch (error) {
            yield put(FetchUserMeFailure(error.detail));
        }
    });
}

function* FetchUser() {
    yield takeEvery(UserActionTypes.FETCH_USER, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let user = yield call(httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${action.payload}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                }
            );

            yield put(FetchUserSuccess(user));
        }
        catch (error) {
            yield put(FetchUserFailure(error.detail));
        }
    });
}

function* FetchUsers() {
    yield takeEvery(UserActionTypes.FETCH_USERS, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let user = yield call(httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                }
            );

            yield put(FetchUsersSuccess(user));
        }
        catch (error) {
            yield put(FetchUsersFailure(error.detail));
        }
    })
}

function* UpdateUser() {
    yield takeEvery(UserActionTypes.UPDATE_USER, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let user = yield call(httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${action.payload.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `bearer ${token}`
                    },
                    body: action.payload.userUpdate
                }
            );

            yield put(UpdateUserSuccess(user));
        }
        catch (error) {
            yield put(UpdateUserFailure(error.detail));
        }
    });
}

function* CreateUser() {
    yield takeEvery(UserActionTypes.CREATE_USER, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let user = yield call(httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `bearer ${token}`
                    },
                    body: action.payload.userCreate
                }
            );

            yield put(CreateUserSuccess(user));
        }
        catch (error) {
            yield put(CreateUserFailure(error.detail));
        }
    });
}

function* FetchUserMethods() {
    yield all([FetchUserMe(), FetchUser(), FetchUsers(), UpdateUser(), CreateUser()]);
}

export default FetchUserMethods;