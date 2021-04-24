import { all, put, takeEvery } from "redux-saga/effects";

import TimetableActionTypes from "./action.types";
import { fetchTimetableSuccess, fetchTimetableFailure } from "./action";

const dummyTimetable = [
    {
        day: "monday",
        subject: "OOP",
        start_time: "08:30 AM",
        end_time: "09:30 AM",
        professor_name: "Prof. John Doe",
        professor_image: "https://github.com/rev-amp.png",
        lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
        attendance: "80%",
    },
    {
        day: "monday",
        subject: "DS",
        start_time: "09:30 AM",
        end_time: "10:30 AM",
        professor_name: "Prof. Harry Potter",
        professor_image: "https://github.com/aniket-spidey.png",
        lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
        attendance: "90%",
    },
    {
        day: "tuesday",
        subject: "AI/ML",
        start_time: "11:00 AM",
        end_time: "12:00 PM",
        professor_name: "Prof. Wanda Maximoff",
        professor_image: "https://github.com/akhilnarang.png",
        lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
        attendance: "50%",
    },
    {
        day: "wednesday",
        subject: "Python (Practicals)",
        start_time: "12:00 PM",
        end_time: "2:00 PM",
        professor_name: "Prof. Harley Quinn",
        professor_image: "https://github.com/ksdfg.png",
        lecture_link: "https://www.microsoft.com/en-in/microsoft-teams/group-chat-software",
        attendance: "20%",
    },
];

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
