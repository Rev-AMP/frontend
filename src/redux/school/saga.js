import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import SchoolActionTypes from "./action.types";
import {
    CreateSchoolFailure,
    CreateSchoolSuccess,
    FetchSchools as ActionFetchSchools,
    FetchSchoolFailure,
    FetchSchoolsFailure,
    FetchSchoolsSuccess,
    FetchSchoolSuccess,
    UpdateSchoolFailure,
    UpdateSchoolSuccess,
    DeleteSchoolFailure,
    DeleteSchoolSuccess,
} from "./action";
import { APICall } from "services/http-client";

function* FetchSchools() {
    yield takeEvery(SchoolActionTypes.FETCH_SCHOOLS, function* (action) {
        try {
            const schools = yield APICall(`/api/v1/schools/`, {
                method: "GET",
            });
            yield put(FetchSchoolsSuccess(schools));
        } catch (error) {
            yield put(FetchSchoolsFailure(error.detail));
        }
    });
}

function* FetchSchool() {
    yield takeEvery(SchoolActionTypes.FETCH_SCHOOL, function* (action) {
        try {
            const school = yield APICall(`/api/v1/schools/${action.payload}`, {
                method: "GET",
            });
            yield put(FetchSchoolSuccess(school));
        } catch (error) {
            yield put(FetchSchoolFailure(error.detail));
        }
    });
}

function* UpdateSchool() {
    yield takeEvery(SchoolActionTypes.UPDATE_SCHOOL, function* (action) {
        try {
            const selectedSchool = yield select((state) => state.school.selectedSchool);
            const school = yield APICall(`/api/v1/schools/${selectedSchool.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(UpdateSchoolSuccess(school));
        } catch (error) {
            yield put(UpdateSchoolFailure(error.detail));
        }
    });
}

function* CreateSchool() {
    yield takeEvery(SchoolActionTypes.CREATE_SCHOOL, function* (action) {
        try {
            const school = yield APICall(`/api/v1/schools/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(CreateSchoolSuccess(school));
        } catch (error) {
            yield put(CreateSchoolFailure(error.detail));
        }
    });
}

function* DeleteSchool() {
    yield takeEvery(SchoolActionTypes.DELETE_SCHOOL, function* (action) {
        try {
            yield APICall(`/api/v1/schools/${action.payload}`, {
                method: "DELETE",
            });
            yield put(DeleteSchoolSuccess());
        } catch (error) {
            yield put(DeleteSchoolFailure(error.detail));
        }
    });
}

function* RefreshSchoolList() {
    yield takeLatest(
        [
            SchoolActionTypes.UPDATE_SCHOOL_SUCCESS,
            SchoolActionTypes.CREATE_SCHOOL_SUCCESS,
            SchoolActionTypes.DELETE_SCHOOL_SUCCESS,
        ],
        function* (action) {
            yield put(ActionFetchSchools());
        }
    );
}

function* SchoolMethods() {
    yield all([FetchSchool(), FetchSchools(), UpdateSchool(), CreateSchool(), DeleteSchool(), RefreshSchoolList()]);
}

export default SchoolMethods;
