import TermActionTypes from "./action.types";

export const fetchTerms = () => ({
    type: TermActionTypes.FETCH_TERMS,
});

export const fetchTermsSuccess = (terms) => ({
    type: TermActionTypes.FETCH_TERMS_SUCCESS,
    payload: terms,
});

export const fetchTermsFailure = (errors) => ({
    type: TermActionTypes.FETCH_TERMS_FAILURE,
    payload: errors,
});

export const fetchTerm = (id) => ({
    type: TermActionTypes.FETCH_TERM,
    payload: id,
});

export const fetchTermSuccess = (term) => ({
    type: TermActionTypes.FETCH_TERM_SUCCESS,
    payload: term,
});

export const fetchTermFailure = (errors) => ({
    type: TermActionTypes.FETCH_TERM_FAILURE,
    payload: errors,
});

export const updateTerm = (termUpdate) => ({
    type: TermActionTypes.UPDATE_TERM,
    payload: termUpdate,
});

export const updateTermSuccess = (term) => ({
    type: TermActionTypes.UPDATE_TERM_SUCCESS,
    payload: term,
});

export const updateTermFailure = (errors) => ({
    type: TermActionTypes.UPDATE_TERM_FAILURE,
    payload: errors,
});

export const createTerm = (termCreate) => ({
    type: TermActionTypes.CREATE_TERM,
    payload: termCreate,
});

export const createTermSuccess = (term) => ({
    type: TermActionTypes.CREATE_TERM_SUCCESS,
    payload: term,
});

export const createTermFailure = (errors) => ({
    type: TermActionTypes.CREATE_TERM_FAILURE,
    payload: errors,
});

export const deleteTerm = (termId) => ({
    type: TermActionTypes.DELETE_TERM,
    payload: termId,
});

export const deleteTermSuccess = () => ({
    type: TermActionTypes.DELETE_TERM_SUCCESS,
});

export const deleteTermFailure = (errors) => ({
    type: TermActionTypes.DELETE_TERM_FAILURE,
    payload: errors,
});

export const fetchStudentsForTerm = (termId) => ({
    type: TermActionTypes.FETCH_STUDENTS_FOR_TERM,
    payload: termId,
});

export const fetchStudentsForTermSuccess = (students) => ({
    type: TermActionTypes.FETCH_STUDENTS_FOR_TERM_SUCCESS,
    payload: students,
});

export const fetchStudentsForTermFailure = (errors) => ({
    type: TermActionTypes.FETCH_STUDENTS_FOR_TERM_FAILURE,
    payload: errors,
});
