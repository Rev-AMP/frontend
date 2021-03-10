import TermActionTypes from "./action.types";

export const FetchTerms = () => ({
    type: TermActionTypes.FETCH_TERMS,
});

export const FetchTermsSuccess = (terms) => ({
    type: TermActionTypes.FETCH_TERMS_SUCCESS,
    payload: terms,
});

export const FetchTermsFailure = (error) => ({
    type: TermActionTypes.FETCH_TERMS_FAILURE,
    payload: error,
});

export const FetchTerm = (id) => ({
    type: TermActionTypes.FETCH_TERM,
    payload: id,
});

export const FetchTermSuccess = (term) => ({
    type: TermActionTypes.FETCH_TERM_SUCCESS,
    payload: term,
});

export const FetchTermFailure = (error) => ({
    type: TermActionTypes.FETCH_TERM_FAILURE,
    payload: error,
});

export const UpdateTerm = (termUpdate) => ({
    type: TermActionTypes.UPDATE_TERM,
    payload: termUpdate,
});

export const UpdateTermSuccess = (term) => ({
    type: TermActionTypes.UPDATE_TERM_SUCCESS,
    payload: term,
});

export const UpdateTermFailure = (error) => ({
    type: TermActionTypes.UPDATE_TERM_FAILURE,
    payload: error,
});

export const CreateTerm = (termCreate) => ({
    type: TermActionTypes.CREATE_TERM,
    payload: termCreate,
});

export const CreateTermSuccess = (term) => ({
    type: TermActionTypes.CREATE_TERM_SUCCESS,
    payload: term,
});

export const CreateTermFailure = (error) => ({
    type: TermActionTypes.CREATE_TERM_FAILURE,
    payload: error,
});

export const DeleteTerm = (termId) => ({
    type: TermActionTypes.DELETE_TERM,
    payload: termId,
});

export const DeleteTermSuccess = () => ({
    type: TermActionTypes.DELETE_TERM_SUCCESS,
});

export const DeleteTermFailure = (error) => ({
    type: TermActionTypes.DELETE_TERM_FAILURE,
    payload: error,
});
