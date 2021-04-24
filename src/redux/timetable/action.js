import TimetableActionTypes from "./action.types";

export const fetchTimetable = (studentId) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE,
    payload: studentId,
});

export const fetchTimetableSuccess = (timetable) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_SUCCESS,
    payload: timetable,
});

export const fetchTimetableFailure = (errors) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_FAILURE,
    payload: errors,
});
