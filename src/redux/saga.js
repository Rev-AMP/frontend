import { all } from "redux-saga/effects";

import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/user/saga";
import SchoolSaga from "redux/school/saga";
import YearSaga from "redux/year/saga";

const RootSaga = function* () {
    yield all([AuthSaga(), UserSaga(), SchoolSaga(), YearSaga()]);
};

export default RootSaga;
