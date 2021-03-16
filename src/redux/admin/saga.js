import { all, put, takeEvery } from "redux-saga/effects";

import AdminActionTypes from "./action.types";
import { fetchAdminMeFailure, fetchAdminMeSuccess } from "./action";
import { APICall } from "services/http-client";
import { AdminPermissions } from "./utils";

function* fetchAdminMe() {
    yield takeEvery(AdminActionTypes.FETCH_ADMIN_ME, function* () {
        try {
            let admin = yield APICall("/api/v1/admins/", { method: "GET" });
            admin.permissions = new AdminPermissions(admin.permissions);
            yield put(fetchAdminMeSuccess(admin));
        } catch (error) {
            yield put(fetchAdminMeFailure(error.detail));
        }
    });
}

function* fetchAdminMethods() {
    yield all([fetchAdminMe()]);
}

export default fetchAdminMethods;
