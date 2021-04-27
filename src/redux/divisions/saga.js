import { all, put, takeEvery } from "redux-saga/effects";

import DivisionActionTypes from "./action.types";

import {
    fetchDivisionsSuccess,
    fetchDivisionsFailure
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

function* divisionMethods() {
    yield all([
        fetchDivisions(),
    ]);
}

export default divisionMethods;