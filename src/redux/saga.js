import { all } from 'redux-saga/effects';

import AuthSaga from './auth/saga';
import UserSaga from './user/saga';

const RootSaga = function* () {
    yield all([
        AuthSaga(),
        UserSaga()
    ]);
}

export default RootSaga;