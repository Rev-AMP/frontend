import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import SchoolActionTypes from "./action.types";
import {
    createSchoolFailure,
    createSchoolSuccess,
    fetchSchools as ActionFetchSchools,
    fetchSchoolFailure,
    fetchSchoolsFailure,
    fetchSchoolsSuccess,
    fetchSchoolSuccess,
    fetchSchoolTimeSlotsSuccess,
    fetchSchoolTimeSlotsFailure,
    updateSchoolFailure,
    updateSchoolSuccess,
    deleteSchoolFailure,
    deleteSchoolSuccess,
} from "./action";
import { APICall } from "services/http-client";

function* fetchSchools() {
    yield takeEvery(SchoolActionTypes.FETCH_SCHOOLS, function* (action) {
        try {
            const schools = yield APICall(`/api/v1/schools/`, {
                method: "GET",
            });
            yield put(fetchSchoolsSuccess(schools));
        } catch (error) {
            yield put(fetchSchoolsFailure(error.detail));
        }
    });
}

function* fetchSchool() {
    yield takeEvery(SchoolActionTypes.FETCH_SCHOOL, function* (action) {
        try {
            const school = yield APICall(`/api/v1/schools/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchSchoolSuccess(school));
        } catch (error) {
            yield put(fetchSchoolFailure(error.detail));
        }
    });
}

function* fetchSchoolTimeSlots() {
    yield takeEvery(SchoolActionTypes.FETCH_SCHOOLS, function* (action) {
        try {
            const schools = yield APICall(`/api/v1/schools/${action.payload}/timeslots`, {
                method: "GET",
            });
            yield put(fetchSchoolTimeSlotsSuccess(schools));
        } catch (error) {
            yield put(fetchSchoolTimeSlotsFailure(error.detail));
        }
    });
}

function* updateSchool() {
    yield takeEvery(SchoolActionTypes.UPDATE_SCHOOL, function* (action) {
        try {
            const selectedSchool = yield select((state) => state.school.selectedSchool);
            const school = yield APICall(`/api/v1/schools/${selectedSchool.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateSchoolSuccess(school));
        } catch (error) {
            yield put(updateSchoolFailure(error.detail));
        }
    });
}

function* createSchool() {
    yield takeEvery(SchoolActionTypes.CREATE_SCHOOL, function* (action) {
        try {
            const school = yield APICall(`/api/v1/schools/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createSchoolSuccess(school));
        } catch (error) {
            yield put(createSchoolFailure(error.detail));
        }
    });
}

function* deleteSchool() {
    yield takeEvery(SchoolActionTypes.DELETE_SCHOOL, function* (action) {
        try {
            yield APICall(`/api/v1/schools/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteSchoolSuccess());
        } catch (error) {
            yield put(deleteSchoolFailure(error.detail));
        }
    });
}

function* refreshSchoolList() {
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

function* schoolMethods() {
    yield all([
        fetchSchool(),
        fetchSchools(),
        updateSchool(),
        createSchool(),
        deleteSchool(),
        refreshSchoolList(),
        fetchSchoolTimeSlots(),
    ]);
}

export default schoolMethods;
