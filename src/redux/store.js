import {createStore, combineReducers,applyMiddleware} from 'redux';
import createSagaMiddleWare from 'redux-saga';
import Logger from 'redux-logger';
import {all} from 'redux-saga/effects';

import LoginReducer from './login/reducer';
import LoginSaga from './login/saga';
const SagaMiddleware=createSagaMiddleWare();

const store=createStore(
    combineReducers({LoginReducer}),
    applyMiddleware(SagaMiddleware,Logger)
);

const sagas= function* (){
    yield all([LoginSaga()]);
}

SagaMiddleware.run(sagas);

export default store;