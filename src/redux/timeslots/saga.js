import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import TimeSlotActionTypes from "./action.types";
import {
    createTimeSlotFailure,
    createTimeSlotSuccess,
    fetchTimeSlots as ActionFetchTimeSlots,
    fetchTimeSlotFailure,
    fetchTimeSlotsFailure,
    fetchTimeSlotsSuccess,
    fetchTimeSlotSuccess,
    updateTimeSlotFailure,
    updateTimeSlotSuccess,
    deleteTimeSlotFailure,
    deleteTimeSlotSuccess,
} from "./action";
import { APICall } from "services/http-client";

function* fetchTimeSlots() {
    yield takeEvery(TimeSlotActionTypes.FETCH_TIME_SLOTS, function* (action) {
        try {
            const timeslots = yield APICall(`/api/v1/timeslots/`, {
                method: "GET",
            });
            yield put(fetchTimeSlotsSuccess(timeslots));
        } catch (error) {
            yield put(fetchTimeSlotsFailure(error.detail));
        }
    });
}

function* fetchTimeSlot() {
    yield takeEvery(TimeSlotActionTypes.FETCH_TIME_SLOT, function* (action) {
        try {
            const timeslot = yield APICall(`/api/v1/timeslots/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchTimeSlotSuccess(timeslot));
        } catch (error) {
            yield put(fetchTimeSlotFailure(error.detail));
        }
    });
}

function* updateTimeSlot() {
    yield takeEvery(TimeSlotActionTypes.UPDATE_TIME_SLOT, function* (action) {
        try {
            const selectedTimeSlot = yield select((state) => state.timeslot.selectedTimeSlot);
            const timeslot = yield APICall(`/api/v1/timeslots/${selectedTimeSlot.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateTimeSlotSuccess(timeslot));
        } catch (error) {
            yield put(updateTimeSlotFailure(error.detail));
        }
    });
}

function* createTimeSlot() {
    yield takeEvery(TimeSlotActionTypes.CREATE_TIME_SLOT, function* (action) {
        try {
            const timeslot = yield APICall(`/api/v1/timeslots/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createTimeSlotSuccess(timeslot));
        } catch (error) {
            yield put(createTimeSlotFailure(error.detail));
        }
    });
}

function* deleteTimeSlot() {
    yield takeEvery(TimeSlotActionTypes.DELETE_TIME_SLOT, function* (action) {
        try {
            yield APICall(`/api/v1/timeslots/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteTimeSlotSuccess());
        } catch (error) {
            yield put(deleteTimeSlotFailure(error.detail));
        }
    });
}

function* refreshTimeSlotList() {
    yield takeLatest(
        [
            TimeSlotActionTypes.UPDATE_TIME_SLOT_SUCCESS,
            TimeSlotActionTypes.CREATE_TIME_SLOT_SUCCESS,
            TimeSlotActionTypes.DELETE_TIME_SLOT_SUCCESS,
        ],
        function* (action) {
            yield put(ActionFetchTimeSlots());
        }
    );
}

function* timeslotMethods() {
    yield all([
        fetchTimeSlot(),
        fetchTimeSlots(),
        updateTimeSlot(),
        createTimeSlot(),
        deleteTimeSlot(),
        refreshTimeSlotList(),
    ]);
}

export default timeslotMethods;
