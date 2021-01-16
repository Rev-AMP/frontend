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