import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import TimetableActionTypes from "./action.types";
import {
    createLectureFailure,
    createLectureSuccess,
    fetchLectureFailure,
    fetchLectureSuccess,
    fetchTimetableDivision as ActionFetchTimetable,
    fetchTimetableDivisionFailure,
    fetchTimetableDivisionSuccess,
    fetchTimetableFailure,
    fetchTimetableSuccess,
    updateLectureFailure,
    updateLectureSuccess,
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
            const selectedDivision = yield select((state) => state.division.selectedDivision);
            const timetable = yield APICall(`/api/v1/timetable/${selectedDivision.id}`, {
                method: "GET",
            });
            yield put(fetchTimetableDivisionSuccess(timetable));
        } catch (error) {
            yield put(fetchTimetableDivisionFailure(error.detail));
        }
    });
}

function* fetchLecture() {
    yield takeEvery(TimetableActionTypes.FETCH_LECTURE, function* (action) {
        try {
            const school = yield APICall(`/api/v1/lectures/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchLectureSuccess(school));
        } catch (error) {
            yield put(fetchLectureFailure(error.detail));
        }
    });
}

function* updateLecture() {
    yield takeEvery(TimetableActionTypes.UPDATE_LECTURE, function* (action) {
        try {
            const selectedLecture = yield select((state) => state.timetable.lecture);
            const school = yield APICall(`/api/v1/lectures/${selectedLecture.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateLectureSuccess(school));
        } catch (error) {
            yield put(updateLectureFailure(error.detail));
        }
    });
}

function* createLecture() {
    yield takeEvery(TimetableActionTypes.CREATE_LECTURE, function* (action) {
        try {
            const school = yield APICall(`/api/v1/lectures/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createLectureSuccess(school));
        } catch (error) {
            yield put(createLectureFailure(error.detail));
        }
    });
}

function* refreshTimeSlots() {
    yield takeLatest(
        [TimetableActionTypes.UPDATE_LECTURE_SUCCESS, TimetableActionTypes.CREATE_LECTURE_SUCCESS],
        function* (action) {
            yield put(ActionFetchTimetable());
        }
    );
}

function* timetableMethods() {
    yield all([
        fetchTimetable(),
        fetchTimetableDivision(),
        updateLecture(),
        createLecture(),
        fetchLecture(),
        refreshTimeSlots(),
    ]);
}

export default timetableMethods;
