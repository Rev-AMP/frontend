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

export const fetchTimetableDivision = () => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_DIVISION,
});

export const fetchTimetableDivisionSuccess = (timetable) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_DIVISION_SUCCESS,
    payload: timetable,
});

export const fetchTimetableDivisionFailure = (errors) => ({
    type: TimetableActionTypes.FETCH_TIMETABLE_DIVISION_FAILURE,
    payload: errors,
});

export const fetchLecture = (lectureId) => ({
    type: TimetableActionTypes.FETCH_LECTURE,
    payload: lectureId,
});

export const fetchLectureSuccess = (timetable) => ({
    type: TimetableActionTypes.FETCH_LECTURE_SUCCESS,
    payload: timetable,
});

export const fetchLectureFailure = (errors) => ({
    type: TimetableActionTypes.FETCH_LECTURE_FAILURE,
    payload: errors,
});

export const updateLecture = (lectureUpdate) => ({
    type: TimetableActionTypes.UPDATE_LECTURE,
    payload: lectureUpdate,
});

export const updateLectureSuccess = (lecture) => ({
    type: TimetableActionTypes.UPDATE_LECTURE_SUCCESS,
    payload: lecture,
});

export const updateLectureFailure = (errors) => ({
    type: TimetableActionTypes.UPDATE_LECTURE_FAILURE,
    payload: errors,
});

export const createLecture = (lectureCreate) => ({
    type: TimetableActionTypes.CREATE_LECTURE,
    payload: lectureCreate,
});

export const createLectureSuccess = (lecture) => ({
    type: TimetableActionTypes.CREATE_LECTURE_SUCCESS,
    payload: lecture,
});

export const createLectureFailure = (errors) => ({
    type: TimetableActionTypes.CREATE_LECTURE_FAILURE,
    payload: errors,
});
