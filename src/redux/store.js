import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import Logger from 'redux-logger';
import { all } from 'redux-saga/effects';

import LoginReducer from './login/reducer';
import UserReducer from './user/reducer';
import LoginSaga from './login/saga';
import UserSaga from './user/saga';

const SagaMiddleware = createSagaMiddleWare();

const store = createStore(
    combineReducers({ login: LoginReducer, user: UserReducer }),
    applyMiddleware(SagaMiddleware, Logger)
);

const sagas = function* () {
    yield all([LoginSaga(), UserSaga()]);
}

SagaMiddleware.run(sagas);

export default store;