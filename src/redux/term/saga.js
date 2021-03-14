import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import TermActionTypes from "./action.types";
import {
    CreateTermFailure,
    CreateTermSuccess,
    FetchTermSuccess,
    FetchTermFailure,
    FetchTerms as ActionFetchTerms,
    FetchTermsFailure,
    FetchTermsSuccess,
    UpdateTermFailure,
    UpdateTermSuccess,
    DeleteTermSuccess,
    DeleteTermFailure,
} from "./action";
import { APICall } from "services/http-client";

function* FetchTerms() {
    yield takeEvery(TermActionTypes.FETCH_TERMS, function* (action) {
        try {
            const terms = yield APICall(`/api/v1/terms/`, {
                method: "GET",
            });
            yield put(FetchTermsSuccess(terms));
        } catch (error) {
            yield put(FetchTermsFailure(error.detail));
        }
    });
}

function* FetchTerm() {
    yield takeEvery(TermActionTypes.FETCH_TERM, function* (action) {
        try {
            const term = yield APICall(`/api/v1/terms/${action.payload}`, {
                method: "GET",
            });
            yield put(FetchTermSuccess(term));
        } catch (error) {
            yield put(FetchTermFailure(error.detail));
        }
    });
}

function* UpdateTerm() {
    yield takeEvery(TermActionTypes.UPDATE_TERM, function* (action) {
        try {
            const selectedTerm = yield select((state) => state.term.selectedTerm);
            const term = yield APICall(`/api/v1/terms/${selectedTerm.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(UpdateTermSuccess(term));
        } catch (error) {
            yield put(UpdateTermFailure(error.detail));
        }
    });
}

function* CreateTerm() {
    yield takeEvery(TermActionTypes.CREATE_TERM, function* (action) {
        try {
            const term = yield APICall(`/api/v1/terms/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(CreateTermSuccess(term));
        } catch (error) {
            yield put(CreateTermFailure(error.detail));
        }
    });
}

function* DeleteTerm() {
    yield takeEvery(TermActionTypes.DELETE_TERM, function* (action) {
        try {
            yield APICall(`/api/v1/terms/${action.payload}`, {
                method: "DELETE",
            });
            yield put(DeleteTermSuccess());
        } catch (error) {
            yield put(DeleteTermFailure(error.detail));
        }
    });
}

function* RefreshTermList() {
    yield takeLatest(
        [TermActionTypes.UPDATE_TERM_SUCCESS, TermActionTypes.CREATE_TERM_SUCCESS, TermActionTypes.DELETE_TERM_SUCCESS],
        function* (action) {
            yield put(ActionFetchTerms());
        }
    );
}

function* TermMethods() {
    yield all([FetchTerms(), FetchTerm(), UpdateTerm(), CreateTerm(), DeleteTerm(), RefreshTermList()]);
}

export default TermMethods;
