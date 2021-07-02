import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import YearActionTypes from "./action.types";
import {
    createYearFailure,
    createYearSuccess,
    deleteYearFailure,
    deleteYearSuccess,
    fetchYearFailure,
    fetchYears as ActionFetchYears,
    fetchYearsFailure,
    fetchYearsSuccess,
    fetchYearSuccess,
    updateYearFailure,
    updateYearSuccess,
} from "./action";
import { APICall } from "services/http-client";

function* fetchYears() {
    yield takeEvery(YearActionTypes.FETCH_YEARS, function* (action) {
        try {
            const years = yield APICall(`/api/v1/years/`, {
                method: "GET",
            });
            yield put(fetchYearsSuccess(years));
        } catch (error) {
            yield put(fetchYearsFailure(error.detail));
        }
    });
}

function* fetchYear() {
    yield takeEvery(YearActionTypes.FETCH_YEAR, function* (action) {
        try {
            const year = yield APICall(`/api/v1/years/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchYearSuccess(year));
        } catch (error) {
            yield put(fetchYearFailure(error.detail));
        }
    });
}

function* updateYear() {
    yield takeEvery(YearActionTypes.UPDATE_YEAR, function* (action) {
        try {
            const selectedYear = yield select((state) => state.year.selectedYear);
            const year = yield APICall(`/api/v1/years/${selectedYear.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateYearSuccess(year));
        } catch (error) {
            yield put(updateYearFailure(error.detail));
        }
    });
}

function* createYear() {
    yield takeEvery(YearActionTypes.CREATE_YEAR, function* (action) {
        try {
            const year = yield APICall(`/api/v1/years/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createYearSuccess(year));
        } catch (error) {
            yield put(createYearFailure(error.detail));
        }
    });
}

function* deleteYear() {
    yield takeEvery(YearActionTypes.DELETE_YEAR, function* (action) {
        try {
            yield APICall(`/api/v1/years/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteYearSuccess());
        } catch (error) {
            yield put(deleteYearFailure(error.detail));
        }
    });
}

function* refreshYearList() {
    yield takeLatest(
        [YearActionTypes.UPDATE_YEAR_SUCCESS, YearActionTypes.CREATE_YEAR_SUCCESS, YearActionTypes.DELETE_YEAR_SUCCESS],
        function* (action) {
            yield put(ActionFetchYears());
        }
    );
}

function* yearMethods() {
    yield all([fetchYears(), fetchYear(), updateYear(), createYear(), deleteYear(), refreshYearList()]);
}

export default yearMethods;
