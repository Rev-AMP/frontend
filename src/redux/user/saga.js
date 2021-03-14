import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import UserActionTypes from "./action.types";
import {
    fetchUserMeFailure,
    fetchUserMeSuccess,
    updateUserMeSuccess,
    updateUserMeFailure,
    fetchUserFailure,
    fetchUserSuccess,
    fetchUsers as ActionFetchUsers,
    fetchUsersSuccess,
    fetchUsersFailure,
    updateUserSuccess,
    updateUserFailure,
    createUserSuccess,
    createUserFailure,
} from "./action";
import { addProfilePictureURL, setProfilePicture } from "./util";
import { APICall } from "services/http-client";

function* fetchUserMe() {
    yield takeEvery(UserActionTypes.FETCH_USER_ME, function* () {
        try {
            let user = yield APICall(`/api/v1/users/me`, {
                method: "GET",
            });
            user.profile_picture = addProfilePictureURL(user);
            yield put(fetchUserMeSuccess(user));
        } catch (error) {
            yield put(fetchUserMeFailure(error.detail));
        }
    });
}

function* updateUserMe() {
    yield takeEvery(UserActionTypes.UPDATE_USER_ME, function* (action) {
        try {
            // save profile_picture separately so we don't send a file in body
            const { profile_picture:profilePicture, ...payload} = action.payload;
            let user = yield APICall(`/api/v1/users/me`, {
                method: "PUT",
                body: JSON.stringify(payload),
            });

            // update profile picture
            if (profilePicture) {
                user = yield setProfilePicture(user.id, profilePicture);
            }

            user.profile_picture = addProfilePictureURL(user);
            yield put(updateUserMeSuccess(user));
        } catch (error) {
            yield put(updateUserMeFailure(error.detail));
        }
    });
}

function* fetchUser() {
    yield takeEvery(UserActionTypes.FETCH_USER, function* (action) {
        try {
            let user = yield APICall(`/api/v1/users/${action.payload}`, {
                method: "GET",
            });
            user.profile_picture = addProfilePictureURL(user);
            yield put(fetchUserSuccess(user));
        } catch (error) {
            yield put(fetchUserFailure(error.detail));
        }
    });
}

function* fetchUsers() {
    yield takeEvery(UserActionTypes.FETCH_USERS, function* (action) {
        try {
            let users = yield APICall(`/api/v1/users/`, {
                method: "GET",
            });

            users.forEach((user, index) => (users[index].profile_picture = addProfilePictureURL(user)));
            yield put(fetchUsersSuccess(users));
        } catch (error) {
            yield put(fetchUsersFailure(error.detail));
        }
    });
}

function* updateUser() {
    yield takeEvery(UserActionTypes.UPDATE_USER, function* (action) {
        try {
            // save profile_picture separately so we don't send a file in body
            const { profile_picture:profilePicture, ...payload} = action.payload;

            // get token and user to update
            let selectedUser = yield select((state) => state.user.selectedUser);

            // update user info
            let user = yield APICall(`/api/v1/users/${selectedUser.id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
            });

            // update profile picture
            if (profilePicture) {
                user = yield setProfilePicture(selectedUser.id, profilePicture);
            }

            user.profile_picture = addProfilePictureURL(user);
            yield put(updateUserSuccess(user));
        } catch (error) {
            yield put(updateUserFailure(error.detail));
        }
    });
}

function* createUser() {
    yield takeEvery(UserActionTypes.CREATE_USER, function* (action) {
        try {
            // save profile_picture separately so we don't send a file in body
            const { profile_picture:profilePicture, ...payload} = action.payload;

            // create new user
            let user = yield APICall(`/api/v1/users`, {
                method: "POST",
                body: JSON.stringify(payload),
            });

            // update profile picture
            if (profilePicture) {
                user = yield setProfilePicture(user.id, profilePicture);
            }

            user.profile_picture = addProfilePictureURL(user);
            yield put(createUserSuccess(user));
        } catch (error) {
            yield put(createUserFailure(error.detail));
        }
    });
}

function* refreshUserList() {
    yield takeLatest([UserActionTypes.UPDATE_USER_SUCCESS, UserActionTypes.CREATE_USER_SUCCESS], function* (action) {
        yield put(ActionFetchUsers());
    });
}

function* fetchUserMethods() {
    yield all([
        fetchUserMe(),
        updateUserMe(),
        fetchUser(),
        fetchUsers(),
        updateUser(),
        createUser(),
        refreshUserList(),
    ]);
}

export default fetchUserMethods;
