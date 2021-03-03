import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import UserActionTypes from "./action.types";
import {
    FetchUserMeFailure,
    FetchUserMeSuccess,
    UpdateUserMeSuccess,
    UpdateUserMeFailure,
    FetchUserFailure,
    FetchUserSuccess,
    FetchUsers as ActionFetchUsers,
    FetchUsersSuccess,
    FetchUsersFailure,
    UpdateUserSuccess,
    UpdateUserFailure,
    CreateUserSuccess,
    CreateUserFailure,
} from "./action";
import { addProfilePictureURL, setProfilePicture } from "./util";
import httpClient from "services/http-client";

function* FetchUserMe() {
    yield takeEvery(UserActionTypes.FETCH_USER_ME, function* () {
        try {
            let token = yield select((state) => state.auth.accessToken);
            let user = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            user.profile_picture = addProfilePictureURL(user);
            yield put(FetchUserMeSuccess(user));
        } catch (error) {
            yield put(FetchUserMeFailure(error.detail));
        }
    });
}

function* UpdateUserMe() {
    yield takeEvery(UserActionTypes.UPDATE_USER_ME, function* (action) {
        try {
            // save profile_picture separately so we don't send a file in body
            const profilePicture = action.payload.profile_picture;
            delete action.payload.profile_picture;

            // get token for API calls
            let token = yield select((state) => state.auth.accessToken);

            // update user info
            let user = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`, {
                method: "Put",
                headers: {
                    Authorization: `bearer ${token}`,
                },
                body: JSON.stringify(action.payload),
            });

            // update profile picture
            if (profilePicture) {
                user = yield setProfilePicture(token, user.id, profilePicture);
            }

            user.profile_picture = addProfilePictureURL(user);
            yield put(UpdateUserMeSuccess(user));
        } catch (error) {
            yield put(UpdateUserMeFailure(error.detail));
        }
    });
}

function* FetchUser() {
    yield takeEvery(UserActionTypes.FETCH_USER, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let user = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${action.payload}`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            user.profile_picture = addProfilePictureURL(user);
            yield put(FetchUserSuccess(user));
        } catch (error) {
            yield put(FetchUserFailure(error.detail));
        }
    });
}

function* FetchUsers() {
    yield takeEvery(UserActionTypes.FETCH_USERS, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let users = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });

            users.forEach((user, index) => (users[index].profile_picture = addProfilePictureURL(user)));

            yield put(FetchUsersSuccess(users));
        } catch (error) {
            yield put(FetchUsersFailure(error.detail));
        }
    });
}

function* UpdateUser() {
    yield takeEvery(UserActionTypes.UPDATE_USER, function* (action) {
        try {
            // save profile_picture separately so we don't send a file in body
            const profilePicture = action.payload.profile_picture;
            delete action.payload.profile_picture;

            // get token and user to update
            let token = yield select((state) => state.auth.accessToken);
            let selectedUser = yield select((state) => state.user.selectedUser);

            // update user info
            let user = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${selectedUser.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `bearer ${token}`,
                },
                body: JSON.stringify(action.payload),
            });

            // update profile picture
            if (profilePicture) {
                user = yield setProfilePicture(token, selectedUser.id, profilePicture);
            }

            user.profile_picture = addProfilePictureURL(user);
            yield put(UpdateUserSuccess(user));
        } catch (error) {
            yield put(UpdateUserFailure(error.detail));
        }
    });
}

function* CreateUser() {
    yield takeEvery(UserActionTypes.CREATE_USER, function* (action) {
        try {
            // save profile_picture separately so we don't send a file in body
            const profilePicture = action.payload.profile_picture;
            delete action.payload.profile_picture;

            // get token
            let token = yield select((state) => state.auth.accessToken);

            // create new user
            let user = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${token}`,
                },
                body: JSON.stringify(action.payload),
            });

            // update profile picture
            if (profilePicture) {
                user = yield setProfilePicture(token, user.id, profilePicture);
            }

            user.profile_picture = addProfilePictureURL(user);
            yield put(CreateUserSuccess(user));
        } catch (error) {
            yield put(CreateUserFailure(error.detail));
        }
    });
}

function* RefreshUserList() {
    yield takeLatest([UserActionTypes.UPDATE_USER_SUCCESS, UserActionTypes.CREATE_USER_SUCCESS], function* (action) {
        yield put(ActionFetchUsers());
    });
}

function* FetchUserMethods() {
    yield all([
        FetchUserMe(),
        UpdateUserMe(),
        FetchUser(),
        FetchUsers(),
        UpdateUser(),
        CreateUser(),
        RefreshUserList(),
    ]);
}

export default FetchUserMethods;
