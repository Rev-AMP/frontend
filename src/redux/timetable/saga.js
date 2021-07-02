import { all, put, takeEvery } from "redux-saga/effects";

import TimetableActionTypes from "./action.types";
import {
    fetchTimetableSuccess,
    fetchTimetableFailure,
    fetchTimetableDivisionSuccess,
    fetchTimetableDivisionFailure,
} from "./action";
import { APICall } from "services/http-client";

function* fetchTimetable() {
    yield takeEvery(TimetableActionTypes.FETCH_TIMETABLE, function* (action) {
        try {
            const timetable = yield APICall(`/api/v1/timetable/`, {
                method: "GET",
            });
            yield put(fetchTimetableSuccess(timetable));
        } catch (error) {
            yield put(fetchTimetableFailure(error.detail));
        }
    });
}

function* fetchTimetableDivision() {
    yield takeEvery(TimetableActionTypes.FETCH_TIMETABLE_DIVISION, function* (action) {
        try {
            const timetable = yield APICall(`/api/v1/timetable/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchTimetableDivisionSuccess(timetable));
        } catch (error) {
            yield put(fetchTimetableDivisionFailure(error.detail));
        }
    });
}

function* timetableMethods() {
    yield all([fetchTimetable(), fetchTimetableDivision()]);
}

export default timetableMethods;
