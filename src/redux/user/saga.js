import UserActionTypes from "./action.types";
import {FetchUserMeFailure, FetchUserMeSuccess} from "./action";
import {all, put, select, takeEvery} from "redux-saga/effects";

function* FetchUserMe() {
    yield takeEvery(UserActionTypes.FETCH_USER_ME, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);
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
                })
                .catch(error => {
                    throw error;
                })
            yield put(FetchUserMeSuccess(user));
        }
        catch (error) {
            yield put(FetchUserMeFailure(error.detail));
        }
    });
}

function* FetchUserMethods() {
    yield all([FetchUserMe()]);
}

export default FetchUserMethods;