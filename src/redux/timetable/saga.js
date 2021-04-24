import { all, put, takeEvery } from "redux-saga/effects";

import TimetableActionTypes from "./action.types";
import { fetchTimetableSuccess, fetchTimetableFailure } from "./action";

const dummyTimetable = {
    monday: [
        {
            subject: "OOP",
            type: "theory",
            start_time: "08:30 AM",
            end_time: "09:30 AM",
            professor_name: "Prof. John Doe",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "80",
        },
        {
            subject: "DS",
            type: "practical",
            start_time: "09:30 AM",
            end_time: "10:30 AM",
            professor_name: "Prof. Harry Potter",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "60",
        },
    ],
    tuesday: [
        {
            subject: "AI/ML",
            type: "theory",
            start_time: "11:00 AM",
            end_time: "12:00 PM",
            professor_name: "Prof. Wanda Maximoff",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "50",
        },
    ],
    wednesday: [
        {
            subject: "Python",
            type: "practical",
            start_time: "12:00 PM",
            end_time: "2:00 PM",
            professor_name: "Prof. Harley Quinn",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "20",
        },
    ],
    thursday: [
        {
            subject: "OOP",
            type: "theory",
            start_time: "08:30 AM",
            end_time: "09:30 AM",
            professor_name: "Prof. John Doe",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "80",
        },
    ],
    friday: [
        {
            subject: "DS",
            type: "practical",
            start_time: "09:30 AM",
            end_time: "10:30 AM",
            professor_name: "Prof. Harry Potter",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "60",
        },
        {
            subject: "AI/ML",
            type: "theory",
            start_time: "11:00 AM",
            end_time: "12:00 PM",
            professor_name: "Prof. Wanda Maximoff",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "50",
        },
    ],
    saturday: [
        {
            subject: "Python",
            type: "practical",
            start_time: "12:00 PM",
            end_time: "2:00 PM",
            professor_name: "Prof. Harley Quinn",
            lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
            attendance: "20",
        },
    ],
};

const status = {
    success: true,
    detail: ["Sample Response"],
};

function* fetchTimetable() {
    yield takeEvery(TimetableActionTypes.FETCH_TIMETABLE, function* (action) {
        if (status.success) {
            yield put(fetchTimetableSuccess(dummyTimetable));
        } else {
            yield put(fetchTimetableFailure(status.detail));
        }
    });
}

function* timetableMethods() {
    yield all([fetchTimetable()]);
}

export default timetableMethods;
