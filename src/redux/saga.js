import { all } from "redux-saga/effects";

import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/user/saga";
import SchoolSaga from "redux/school/saga";
import YearSaga from "redux/year/saga";
import TermSaga from "redux/term/saga";
import AdminSaga from "redux/admin/saga";
import CourseSaga from "redux/course/saga";
import DivisionSaga from "redux/division/saga";
import TimetableSaga from "redux/timetable/saga";
import TimeSlotSaga from "redux/timeslots/saga";
import FileSaga from "redux/files/saga";

const RootSaga = function* () {
    yield all([
        AuthSaga(),
        UserSaga(),
        SchoolSaga(),
        YearSaga(),
        TermSaga(),
        AdminSaga(),
        CourseSaga(),
        DivisionSaga(),
        TimetableSaga(),
        TimeSlotSaga(),
        FileSaga(),
    ]);
};

export default RootSaga;
