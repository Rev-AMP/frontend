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

export const fetchTimetableDivision = (divisionId) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_DIVISION,
    payload: divisionId,
});

export const fetchTimetableDivisionSuccess = (timetable) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_DIVISION_SUCCESS,
    payload: timetable,
});

export const fetchTimetableDivisionFailure = (errors) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_DIVISION_FAILURE,
    payload: errors,
});
