import TermActionTypes from "./action.types";

export const fetchTerms = () => ({
    type: TermActionTypes.FETCH_TERMS,
});

export const fetchTermsSuccess = (terms) => ({
    type: TermActionTypes.FETCH_TERMS_SUCCESS,
    payload: terms,
});

export const fetchTermsFailure = (error) => ({
    type: TermActionTypes.FETCH_TERMS_FAILURE,
    payload: error,
});

export const fetchTerm = (id) => ({
    type: TermActionTypes.FETCH_TERM,
    payload: id,
});

export const fetchTermSuccess = (term) => ({
    type: TermActionTypes.FETCH_TERM_SUCCESS,
    payload: term,
});

export const fetchTermFailure = (error) => ({
    type: TermActionTypes.FETCH_TERM_FAILURE,
    payload: error,
});

export const updateTerm = (termUpdate) => ({
    type: TermActionTypes.UPDATE_TERM,
    payload: termUpdate,
});

export const updateTermSuccess = (term) => ({
    type: TermActionTypes.UPDATE_TERM_SUCCESS,
    payload: term,
});

export const updateTermFailure = (error) => ({
    type: TermActionTypes.UPDATE_TERM_FAILURE,
    payload: error,
});

export const createTerm = (termCreate) => ({
    type: TermActionTypes.CREATE_TERM,
    payload: termCreate,
});

export const createTermSuccess = (term) => ({
    type: TermActionTypes.CREATE_TERM_SUCCESS,
    payload: term,
});

export const createTermFailure = (error) => ({
    type: TermActionTypes.CREATE_TERM_FAILURE,
    payload: error,
});

export const deleteTerm = (termId) => ({
    type: TermActionTypes.DELETE_TERM,
    payload: termId,
});

export const deleteTermSuccess = () => ({
    type: TermActionTypes.DELETE_TERM_SUCCESS,
});

export const deleteTermFailure = (error) => ({
    type: TermActionTypes.DELETE_TERM_FAILURE,
    payload: error,
});
