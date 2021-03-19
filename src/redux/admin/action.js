import AdminActionTypes from "./action.types";

export const fetchAdmins = () => ({
    type: AdminActionTypes.FETCH_ADMINS,
});
export const fetchAdminsSuccess = (admins) => ({
    type: AdminActionTypes.FETCH_ADMINS_SUCCESS,
    payload: admins,
});
export const fetchAdminsFailure = (error) => ({
    type: AdminActionTypes.FETCH_ADMINS_FAILURE,
    payload: error,
});

export const updateAdmin = (adminUpdate) => ({
    type: AdminActionTypes.UPDATE_ADMIN,
    payload: adminUpdate,
});
export const updateAdminSuccess = (admin) => ({
    type: AdminActionTypes.UPDATE_ADMIN_SUCCESS,
    payload: admin,
});
export const updateAdminFailure = (error) => ({
    type: AdminActionTypes.UPDATE_ADMIN_FAILURE,
    payload: error,
});

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

export const fetchAdmin = (id) => ({
    type: AdminActionTypes.FETCH_ADMIN,
    payload: id,
});
export const fetchAdminSuccess = (admin) => ({
    type: AdminActionTypes.FETCH_ADMIN_SUCCESS,
    payload: admin,
});
export const fetchAdminFailure = (error) => ({
    type: AdminActionTypes.FETCH_ADMIN_FAILURE,
    payload: error,
});
