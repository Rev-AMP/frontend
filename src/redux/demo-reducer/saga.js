import { all,takeEvery, put} from 'redux-saga/effects';
import DemoTypes from './action.types';
import {SagaMessage} from './action';

function* DemoIncrementSaga() {
    yield takeEvery(DemoTypes.INCREMENT,function*(action){
        yield put(SagaMessage("Increment"));
    });
}

function* DemoDecrementSaga(){
    yield takeEvery(DemoTypes.DECREMENT,function*(action){
        yield put(SagaMessage("Decrement"));
    });
}

function* DemoSaga() {
    yield all([DemoDecrementSaga(),DemoIncrementSaga()]);
}

export default DemoSaga;