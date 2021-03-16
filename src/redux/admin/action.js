import AdminActionTypes from "./action.types";

export const fetchAdminMe = () => ({
    type: AdminActionTypes.FETCH_ADMIN_ME,
});

export const fetchAdminMeSuccess = (user) => ({
    type: AdminActionTypes.FETCH_ADMIN_ME_SUCCESS,
    payload: user,
});

export const fetchAdminMeFailure = (error) => ({
    type: AdminActionTypes.FETCH_ADMIN_ME_FAILURE,
    payload: error,
});
