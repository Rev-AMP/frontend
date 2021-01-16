import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import Logger from 'redux-logger';

import RootReducer from './reducer';
import RootSaga from './saga';

const SagaMiddleware = createSagaMiddleWare();

const store = createStore(
    RootReducer,
    applyMiddleware(SagaMiddleware, Logger)
);


SagaMiddleware.run(RootSaga);

export default store;