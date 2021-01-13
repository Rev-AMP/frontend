import {createStore, combineReducers,applyMiddleware} from 'redux';
import createSagaMiddleWare from 'redux-saga';
import Logger from 'redux-logger';
import {all} from 'redux-saga/effects';
import DemoReducer from './demo-reducer/reducer';
import DemoSaga from './demo-reducer/saga';
const SagaMiddleware=createSagaMiddleWare();

const store=createStore(
    combineReducers({DemoReducer}),
    applyMiddleware(SagaMiddleware,Logger)
);

const sagas= function* (){
    yield all([DemoSaga()]);
}

SagaMiddleware.run(sagas);

export default store;