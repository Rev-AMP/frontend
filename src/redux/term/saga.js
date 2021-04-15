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
    fetchStudentsForSelectedTerm as ActionFetchStudents,
    fetchStudentsForSelectedTermSuccess,
    fetchStudentsForSelectedTermFailure,
    deleteStudentFromSelectedTermSuccess,
    deleteStudentFromSelectedTermFailure,
    addStudentsToSelectedTermSuccess,
    addStudentsToSelectedTermFailure,
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

function* fetchStudentsForTerm() {
    yield takeEvery(TermActionTypes.FETCH_STUDENTS_FOR_SELECTED_TERM, function* (action) {
        try {
            const selectedTerm = yield select((state) => state.term.selectedTerm);
            const students = yield APICall(`/api/v1/terms/${selectedTerm.id}/students`, {
                method: "GET",
            });
            students.forEach((student, index) => {
                students[index].id = student.user_id;
            });
            yield put(fetchStudentsForSelectedTermSuccess(students));
        } catch (error) {
            yield put(fetchStudentsForSelectedTermFailure(error.detail));
        }
    });
}

function* deleteStudentFromTerm() {
    yield takeEvery(TermActionTypes.DELETE_STUDENT_FROM_SELECTED_TERM, function* (action) {
        try {
            const selectedTerm = yield select((state) => state.term.selectedTerm);
            yield APICall(`/api/v1/terms/${selectedTerm.id}/students/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteStudentFromSelectedTermSuccess());
        } catch (error) {
            yield put(deleteStudentFromSelectedTermFailure(error.detail));
        }
    });
}

function* addStudentsToSelectedTerm() {
    yield takeEvery(TermActionTypes.ADD_STUDENTS_TO_SELECTED_TERM, function* (action) {
        try {
            const selectedTerm = yield select((state) => state.term.selectedTerm);
            const response = yield APICall(`/api/v1/terms/${selectedTerm.id}/students`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(addStudentsToSelectedTermSuccess(response));
        } catch (error) {
            yield put(addStudentsToSelectedTermFailure(error.detail));
        }
    });
}

function* refreshStudentList() {
    yield takeLatest(
        [
            TermActionTypes.DELETE_STUDENT_FROM_SELECTED_TERM_SUCCESS,
            TermActionTypes.ADD_STUDENTS_TO_SELECTED_TERM_SUCCESS,
        ],
        function* (action) {
            const termId = yield select((state) => state.term.selectedTerm.id);
            yield put(ActionFetchStudents(termId));
        }
    );
}

function* termMethods() {
    yield all([
        fetchTerms(),
        fetchTerm(),
        updateTerm(),
        createTerm(),
        deleteTerm(),
        refreshTermList(),
        fetchStudentsForTerm(),
        deleteStudentFromTerm(),
        addStudentsToSelectedTerm(),
        refreshStudentList(),
    ]);
}

export default termMethods;
