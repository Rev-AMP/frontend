import UserActionTypes from "./action.types";

export const fetchUserMe = () => ({
    type: UserActionTypes.FETCH_USER_ME,
});

export const fetchUserMeSuccess = (user) => ({
    type: UserActionTypes.FETCH_USER_ME_SUCCESS,
    payload: user,
});

export const fetchUserMeFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_ME_FAILURE,
    payload: error,
});

export const updateUserMe = (userUpdate) => ({
    type: UserActionTypes.UPDATE_USER_ME,
    payload: userUpdate,
});

export const updateUserMeSuccess = (user) => ({
    type: UserActionTypes.UPDATE_USER_ME_SUCCESS,
    payload: user,
});

export const updateUserMeFailure = (error) => ({
    type: UserActionTypes.UPDATE_USER_ME_FAILURE,
    payload: error,
});

export const fetchUser = (id) => ({
    type: UserActionTypes.FETCH_USER,
    payload: id,
});

export const fetchUserSuccess = (user) => ({
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload: user,
});

export const fetchUserFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_FAILURE,
    payload: error,
});

export const fetchUsers = () => ({
    type: UserActionTypes.FETCH_USERS,
});

export const fetchUsersSuccess = (users) => ({
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload: users,
});

export const fetchUsersFailure = (error) => ({
    type: UserActionTypes.FETCH_USERS_FAILURE,
    payload: error,
});

export const updateUser = (userUpdate) => ({
    type: UserActionTypes.UPDATE_USER,
    payload: userUpdate,
});

export const updateUserSuccess = (user) => ({
    type: UserActionTypes.UPDATE_USER_SUCCESS,
    payload: user,
});

export const updateUserFailure = (error) => ({
    type: UserActionTypes.UPDATE_USER_FAILURE,
    payload: error,
});

export const createUser = (userCreate) => ({
    type: UserActionTypes.CREATE_USER,
    payload: userCreate,
});

export const createUserSuccess = (user) => ({
    type: UserActionTypes.CREATE_USER_SUCCESS,
    payload: user,
});

export const createUserFailure = (error) => ({
    type: UserActionTypes.CREATE_USER_FAILURE,
    payload: error,
});
