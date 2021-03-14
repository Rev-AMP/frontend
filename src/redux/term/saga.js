import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import TermActionTypes from "./action.types";
import {
    createTermFailure,
    createTermSuccess,
    fetchTermSuccess,
    fetchTermFailure,
    fetchTerms as ActionFetchTerms,
    fetchTermsFailure,
    fetchTermsSuccess,
    updateTermFailure,
    updateTermSuccess,
    deleteTermSuccess,
    deleteTermFailure,
} from "./action";
import { APICall } from "services/http-client";

function* fetchTerms() {
    yield takeEvery(TermActionTypes.FETCH_TERMS, function* (action) {
        try {
            const terms = yield APICall(`/api/v1/terms/`, {
                method: "GET",
            });
            yield put(fetchTermsSuccess(terms));
        } catch (error) {
            yield put(fetchTermsFailure(error.detail));
        }
    });
}

function* fetchTerm() {
    yield takeEvery(TermActionTypes.FETCH_TERM, function* (action) {
        try {
            const term = yield APICall(`/api/v1/terms/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchTermSuccess(term));
        } catch (error) {
            yield put(fetchTermFailure(error.detail));
        }
    });
}

function* updateTerm() {
    yield takeEvery(TermActionTypes.UPDATE_TERM, function* (action) {
        try {
            const selectedTerm = yield select((state) => state.term.selectedTerm);
            const term = yield APICall(`/api/v1/terms/${selectedTerm.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateTermSuccess(term));
        } catch (error) {
            yield put(updateTermFailure(error.detail));
        }
    });
}

function* createTerm() {
    yield takeEvery(TermActionTypes.CREATE_TERM, function* (action) {
        try {
            const term = yield APICall(`/api/v1/terms/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createTermSuccess(term));
        } catch (error) {
            yield put(createTermFailure(error.detail));
        }
    });
}

function* deleteTerm() {
    yield takeEvery(TermActionTypes.DELETE_TERM, function* (action) {
        try {
            yield APICall(`/api/v1/terms/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteTermSuccess());
        } catch (error) {
            yield put(deleteTermFailure(error.detail));
        }
    });
}

function* refreshTermList() {
    yield takeLatest(
        [TermActionTypes.UPDATE_TERM_SUCCESS, TermActionTypes.CREATE_TERM_SUCCESS, TermActionTypes.DELETE_TERM_SUCCESS],
        function* (action) {
            yield put(ActionFetchTerms());
        }
    );
}

function* termMethods() {
    yield all([fetchTerms(), fetchTerm(), updateTerm(), createTerm(), deleteTerm(), refreshTermList()]);
}

export default termMethods;
