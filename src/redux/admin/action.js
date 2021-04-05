import AdminActionTypes from "./action.types";

export const fetchAdmins = () => ({
    type: AdminActionTypes.FETCH_ADMINS,
});
export const fetchAdminsSuccess = (admins) => ({
    type: AdminActionTypes.FETCH_ADMINS_SUCCESS,
    payload: admins,
});
export const fetchAdminsFailure = (errors) => ({
    type: AdminActionTypes.FETCH_ADMINS_FAILURE,
    payload: errors,
});

export const updateAdmin = (adminUpdate) => ({
    type: AdminActionTypes.UPDATE_ADMIN,
    payload: adminUpdate,
});
export const updateAdminSuccess = (admin) => ({
    type: AdminActionTypes.UPDATE_ADMIN_SUCCESS,
    payload: admin,
});
export const updateAdminFailure = (errors) => ({
    type: AdminActionTypes.UPDATE_ADMIN_FAILURE,
    payload: errors,
});

export const fetchAdminMe = () => ({
    type: AdminActionTypes.FETCH_ADMIN_ME,
});
export const fetchAdminMeSuccess = (user) => ({
    type: AdminActionTypes.FETCH_ADMIN_ME_SUCCESS,
    payload: user,
});
export const fetchAdminMeFailure = (errors) => ({
    type: AdminActionTypes.FETCH_ADMIN_ME_FAILURE,
    payload: errors,
});

export const fetchAdmin = (id) => ({
    type: AdminActionTypes.FETCH_ADMIN,
    payload: id,
});
export const fetchAdminSuccess = (admin) => ({
    type: AdminActionTypes.FETCH_ADMIN_SUCCESS,
    payload: admin,
});
export const fetchAdminFailure = (errors) => ({
    type: AdminActionTypes.FETCH_ADMIN_FAILURE,
    payload: errors,
});
