import { all } from "redux-saga/effects";

import AuthSaga from "redux/auth/saga";
import UserSaga from "redux/user/saga";
import SchoolSaga from "redux/school/saga";

const RootSaga = function* () {
    yield all([AuthSaga(), UserSaga(), SchoolSaga()]);
};

export default RootSaga;
