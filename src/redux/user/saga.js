import UserActionTypes from "./action.types";
import {FetchUserMeFailure, FetchUserMeSuccess, FetchUserFailure, FetchUserSuccess} from "./action";
import {all, call, put, select, takeEvery} from "redux-saga/effects";

function* FetchUserMe() {
    yield takeEvery(UserActionTypes.FETCH_USER_ME,function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);
            // let response = yield call(
            //     fetch,
            //     `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`,{
            //     method: 'GET',
            //     headers: {
            //         'Authorization': `bearer ${token}`
            //     }
            // });
            // const body= yield response.json();
            // if (response.ok){
                
            //     yield put(FetchUserMeSuccess(body));
            // } else {
            //     throw body;
            // }

            let user = yield fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                }
            )
                .then(async (response) => {
                    const json = await response.json();
                    return response.ok ? json : Promise.reject(json);
                });
                
            yield put(FetchUserMeSuccess(user));
        }
        catch (error) {
            yield put(FetchUserMeFailure(error.detail));
        }
    });
}

function* FetchUser(){
    yield takeEvery(UserActionTypes.FETCH_USER, function* (action){
        try {
            let token = yield select((state) => state.auth.accessToken);
            // let response = yield call(
            //     fetch,
            //     `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${action.payload}`,{
            //     method: 'GET',
            //     headers: {
            //         'Authorization': `bearer ${token}`
            //     }
            // });
            // const body=yield response.json();
            // if (response.ok){
            //     yield put(FetchUserSuccess(body));
            // } else {
            //     throw body;
            // }
            let user = yield fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${action.payload}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                }
            )
                .then(async (response) => {
                    const json = await response.json();
                    return response.ok ? json : Promise.reject(json);
                });
                
            yield put(FetchUserSuccess(user));
        }
        catch(error) {
            yield put(FetchUserFailure(error.detail));
        }
    });
}

function* FetchUserMethods() {
    yield all([FetchUserMe(),FetchUser()]);
}

export default FetchUserMethods;