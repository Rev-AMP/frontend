import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import YearActionTypes from "./action.types";
import {
    CreateYearFailure,
    CreateYearSuccess,
    FetchYearSuccess,
    FetchYearFailure,
    FetchYears as ActionFetchYears,
    FetchYearsFailure,
    FetchYearsSuccess,
    UpdateYearFailure,
    UpdateYearSuccess,
} from "./action";
import { APICall } from "services/http-client";

function* FetchYears() {
    yield takeEvery(YearActionTypes.FETCH_YEARS, function* (action) {
        try {
            const years = yield APICall(`/api/v1/years/`, {
                method: "GET",
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
            const year = yield APICall(`/api/v1/years/${action.payload}`, {
                method: "GET",
            });
            yield put(FetchYearSuccess(year));
        } catch (error) {
            yield put(FetchYearFailure(error.detail));
        }
    });
}

function* UpdateYear() {
    yield takeEvery(YearActionTypes.UPDATE_YEAR, function* (action) {
        try {
            const selectedYear = yield select((state) => state.year.selectedYear);
            const year = yield APICall(`/api/v1/years/${selectedYear.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(UpdateYearSuccess(year));
        } catch (error) {
            yield put(UpdateYearFailure(error.detail));
        }
    });
}

function* CreateYear() {
    yield takeEvery(YearActionTypes.CREATE_YEAR, function* (action) {
        try {
            const year = yield APICall(`/api/v1/years/`, {
                method: "POST",
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
            const selectedYear = yield select((state) => state.school.selectedYear);

            yield APICall(`/api/v1/years/${selectedYear.id}`, {
                method: "DELETE",
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
    yield all([FetchYears(), FetchYear(), UpdateYear(), CreateYear(), DeleteYear(), RefreshYearList()]);
}

export default YearMethods;
