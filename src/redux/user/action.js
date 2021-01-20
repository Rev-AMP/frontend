import UserActionTypes from "./action.types";

export const FetchUserMe = () => ({
    type: UserActionTypes.FETCH_USER_ME
});

export const FetchUserMeSuccess = (user) => ({
    type: UserActionTypes.FETCH_USER_ME_SUCCESS,
    payload: user
});

export const FetchUserMeFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_ME_FAILURE,
    payload: error
});

export const FetchUser = (id) => ({
    type: UserActionTypes.FETCH_USER,
    payload: id
});

export const FetchUserSuccess = (user) => ({
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload: user
});

export const FetchUserFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_FAILURE,
    payload: error
});

export const FetchUsers = () => ({
    type: UserActionTypes.FETCH_USERS
});

export const FetchUsersSuccess = (users) => ({
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: users
});

export const FetchUsersFailure = (error) => ({
    type: UserActionTypes.FETCH_USERS_FAILURE,
    payload: error
});