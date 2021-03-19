import { all, put, select, takeEvery } from "redux-saga/effects";

import AdminActionTypes from "./action.types";
import {
    fetchAdminMeFailure,
    fetchAdminMeSuccess,
    fetchAdminsSuccess,
    fetchAdminsFailure,
    updateAdminSuccess,
    updateAdminFailure,
    fetchAdminSuccess,
    fetchAdminFailure,
    fetchAdmins as actionFetchAdmins,
} from "./action";
import { APICall } from "services/http-client";
import { AdminPermissions } from "services/admin";

function* fetchAdmins() {
    yield takeEvery(AdminActionTypes.FETCH_ADMINS, function* () {
        try {
            const admins = yield APICall(`/api/v1/admins/`, {
                method: "GET",
            });
            admins.forEach((admin, index) => (admins[index].permissions = new AdminPermissions(admin.permissions)));
            yield put(fetchAdminsSuccess(admins));
        } catch (error) {
            yield put(fetchAdminsFailure(error.detail));
        }
    });
}

function* updateAdmin() {
    yield takeEvery(AdminActionTypes.UPDATE_ADMIN, function* (action) {
        try {
            const selectedAdmin = yield select((state) => state.admin.selectedAdmin);
            const admin = yield APICall(`/api/v1/admins/${selectedAdmin.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            admin.permissions = new AdminPermissions(admin.permissions);
            yield put(updateAdminSuccess(admin));
            yield put(actionFetchAdmins()); // update list of all admins
        } catch (error) {
            yield put(updateAdminFailure(error.detail));
        }
    });
}

function* fetchAdminMe() {
    yield takeEvery(AdminActionTypes.FETCH_ADMIN_ME, function* () {
        try {
            let admin = yield APICall("/api/v1/admins/me", { method: "GET" });
            admin.permissions = new AdminPermissions(admin.permissions);
            yield put(fetchAdminMeSuccess(admin));
        } catch (error) {
            yield put(fetchAdminMeFailure(error.detail));
        }
    });
}

function* fetchAdmin() {
    yield takeEvery(AdminActionTypes.FETCH_ADMIN, function* (action) {
        try {
            let admin = yield APICall(`/api/v1/admins/${action.payload}`, { method: "GET" });
            admin.permissions = new AdminPermissions(admin.permissions);
            yield put(fetchAdminSuccess(admin));
        } catch (error) {
            yield put(fetchAdminFailure(error.detail));
        }
    });
}

function* fetchAdminMethods() {
    yield all([fetchAdmins(), updateAdmin(), fetchAdmin(), fetchAdminMe()]);
}

export default fetchAdminMethods;
