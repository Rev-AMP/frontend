import { takeEvery, put, all, select, call, takeLatest } from "redux-saga/effects";

import YearActionTypes from "./action.types";
import {
    FetchYearFailure,
    FetchYearsFailure,
    FetchYearsSuccess,
    UpdateYearSuccess,
    UpdateYearFailure,
    CreateYearSuccess,
    CreateYearFailure,
    FetchYears as ActionFetchYears,
} from "./action";
import httpClient from "services/http-client";

function* FetchYears() {
    yield takeEvery(YearActionTypes.FETCH_YEARS, function* (action) {
        try {
            const token = yield select((state) => state.auth.accessToken);

            const years = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/years/`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });

            yield put(FetchYearsSuccess(years));
        } catch (error) {
            yield put(FetchYearsFailure(error.detail));
        }
    });
}

function* FetchYear() {
    yield takeEvery(YearActionTypes.FETCH_YEAR, function* (action) {
        try {
            const token = yield select((state) => state.auth.accessToken);

            const year = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/years/${action.payload}`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });

            yield put(FetchYearsSuccess(year));
        } catch (error) {
            yield put(FetchYearFailure(error.detail));
        }
    });
}

function* UpdateYear() {
    yield takeEvery(YearActionTypes.UPDATE_YEAR, function* (action) {
        try {
            const token = yield select((state) => state.auth.accessToken);
            const selectedYear = yield select((state) => state.year.selectedYear);

            const year = yield call(
                httpClient,
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/years/${selectedYear.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                    body: JSON.stringify(action.payload),
                }
            );

            yield put(UpdateYearSuccess(year));
        } catch (error) {
            yield put(UpdateYearFailure(error.detail));
        }
    });
}

function* CreateYear() {
    yield takeEvery(YearActionTypes.CREATE_YEAR, function* (action) {
        try {
            const token = yield select((state) => state.auth.accessToken);

            const year = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/years/`, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${token}`,
                },
                body: JSON.stringify(action.payload),
            });

            yield put(CreateYearSuccess(year));
        } catch (error) {
            yield put(CreateYearFailure(error.detail));
        }
    });
}

function* DeleteYear() {
    yield takeEvery(YearActionTypes.CREATE_YEAR, function* (action) {
        try {
            const token = yield select((state) => state.auth.accessToken);
            const selectedYear = yield select((state) => state.school.selectedYear);

            yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/years/${selectedYear.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });

            yield put(CreateYearSuccess());
        } catch (error) {
            yield put(CreateYearFailure(error.detail));
        }
    });
}

function* RefreshYearList() {
    yield takeLatest(
        [YearActionTypes.UPDATE_YEAR_SUCCESS, YearActionTypes.CREATE_YEAR_SUCCESS, YearActionTypes.DELETE_YEAR_SUCCESS],
        function* (action) {
            yield put(ActionFetchYears());
        }
    );
}

function* YearMethods() {
    yield all([FetchYears, FetchYear, UpdateYear, CreateYear, DeleteYear, RefreshYearList]);
}

export default YearMethods;
