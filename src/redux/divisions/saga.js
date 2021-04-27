import { all, put, takeEvery, takeLatest } from "redux-saga/effects";

import DivisionActionTypes from "./action.types";

import {
    fetchDivisions as ActionFetchDivisions,
    fetchDivisionsSuccess,
    fetchDivisionsFailure,
    deleteDivisionSuccess,
    deleteDivisionFailure,
} from "./action";
import { APICall } from "services/http-client";

function* fetchDivisions() {
    yield takeEvery(DivisionActionTypes.FETCH_DIVISIONS, function* (action) {
        try {
            const divisions = yield APICall(`/api/v1/divisions/`, {
                method: "GET",
            });
            yield put(fetchDivisionsSuccess(divisions));
        } catch (error) {
            yield put(fetchDivisionsFailure(error.detail));
        }
    });
}

function* deleteDivision() {
    yield takeEvery(DivisionActionTypes.DELETE_DIVISION, function* (action) {
        try {
            yield APICall(`/api/v1/divisions/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteDivisionSuccess());
        } catch (error) {
            yield put(deleteDivisionFailure(error.detail));
        }
    });
}

function* refreshDivisionList() {
    yield takeLatest([DivisionActionTypes.DELETE_DIVISION_SUCCESS], function* (action) {
        yield put(ActionFetchDivisions());
    });
}

function* divisionMethods() {
    yield all([fetchDivisions(), deleteDivision(), refreshDivisionList()]);
}

export default divisionMethods;
