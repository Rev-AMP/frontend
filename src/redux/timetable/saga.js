import { all, put, takeEvery } from "redux-saga/effects";

import TimetableActionTypes from "./action.types";
import { fetchTimetableSuccess, fetchTimetableFailure } from "./action";
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

function* timetableMethods() {
    yield all([fetchTimetable()]);
}

export default timetableMethods;
