import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

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
} from "./action";
import httpClient from "services/http-client";

function* FetchSchools() {
    yield takeEvery(SchoolActionTypes.FETCH_SCHOOLS, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let schools = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/schools/`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`,
                },
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
            let token = yield select((state) => state.auth.accessToken);

            let school = yield call(
                httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/schools/${action.payload}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                }
            );

            yield put(FetchSchoolSuccess(school));
        } catch (error) {
            yield put(FetchSchoolFailure(error.detail));
        }
    });
}

function* UpdateSchool() {
    yield takeEvery(SchoolActionTypes.UPDATE_SCHOOL, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);
            let selectedSchool = yield select((state) => state.school.selectedSchool);

            let school = yield call(
                httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/schools/${selectedSchool.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                    body: JSON.stringify(action.payload),
                }
            );

            yield put(UpdateSchoolSuccess(school));
        } catch (error) {
            yield put(UpdateSchoolFailure(error.detail));
        }
    });
}

function* CreateSchool() {
    yield takeEvery(SchoolActionTypes.CREATE_SCHOOL, function* (action) {
        try {
            let token = yield select((state) => state.auth.accessToken);

            let school = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/schools/`, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${token}`,
                },
                body: JSON.stringify(action.payload),
            });

            yield put(CreateSchoolSuccess(school));
        } catch (error) {
            yield put(CreateSchoolFailure(error.detail));
        }
    });
}

function* RefreshSchoolList() {
    yield takeLatest(
        [SchoolActionTypes.UPDATE_SCHOOL_SUCCESS, SchoolActionTypes.CREATE_SCHOOL_SUCCESS],
        function* (action) {
            yield put(ActionFetchSchools());
        }
    );
}

function* SchoolMethods() {
    yield all([FetchSchool(), FetchSchools(), UpdateSchool(), CreateSchool(), RefreshSchoolList()]);
}

export default SchoolMethods;
