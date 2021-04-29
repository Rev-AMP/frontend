import { all, put, takeEvery, takeLatest, select } from "redux-saga/effects";

import DivisionActionTypes from "./action.types";

import {
    fetchDivisions as ActionFetchDivisions,
    fetchDivisionsSuccess,
    fetchDivisionsFailure,
    deleteDivisionSuccess,
    deleteDivisionFailure,
    fetchDivisionSuccess,
    fetchDivisionFailure,
    createDivisionSuccess,
    createDivisionFailure,
    updateDivisionSuccess,
    updateDivisionFailure,
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

function* fetchDivision() {
    yield takeEvery(DivisionActionTypes.FETCH_DIVISION, function* (action) {
        try {
            const division = yield APICall(`/api/v1/divisions/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchDivisionSuccess(division));
        } catch (error) {
            yield put(fetchDivisionFailure(error.detail));
        }
    });
}

function* createDivision() {
    yield takeEvery(DivisionActionTypes.CREATE_DIVISION, function* (action) {
        try {
            const division = yield APICall(`/api/v1/divisions/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createDivisionSuccess(division));
        } catch (error) {
            yield put(createDivisionFailure(error.detail));
        }
    });
}

function* updateDivision() {
    yield takeEvery(DivisionActionTypes.UPDATE_DIVISION, function* (action) {
        try {
            const selectedDivision = yield select((state) => state.division.selectedDivision);
            const division = yield APICall(`/api/v1/divisions/${selectedDivision.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateDivisionSuccess(division));
        } catch (error) {
            yield put(updateDivisionFailure(error.detail));
        }
    });
}

function* refreshDivisionList() {
    yield takeLatest(
        [
            DivisionActionTypes.DELETE_DIVISION_SUCCESS,
            DivisionActionTypes.CREATE_DIVISION_SUCCESS,
            DivisionActionTypes.UPDATE_DIVISION_SUCCESS,
        ],
        function* (action) {
            yield put(ActionFetchDivisions());
        }
    );
}

function* divisionMethods() {
    yield all([
        fetchDivisions(),
        deleteDivision(),
        refreshDivisionList(),
        fetchDivision(),
        createDivision(),
        updateDivision(),
    ]);
}

export default divisionMethods;
