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

export const fetchStudentsForSelectedTerm = () => ({
    type: TermActionTypes.FETCH_STUDENTS_FOR_SELECTED_TERM,
});

export const fetchStudentsForSelectedTermSuccess = (students) => ({
    type: TermActionTypes.FETCH_STUDENTS_FOR_SELECTED_TERM_SUCCESS,
    payload: students,
});

export const fetchStudentsForSelectedTermFailure = (errors) => ({
    type: TermActionTypes.FETCH_STUDENTS_FOR_SELECTED_TERM_FAILURE,
    payload: errors,
});

export const deleteStudentFromSelectedTerm = (studentID) => ({
    type: TermActionTypes.DELETE_STUDENT_FROM_SELECTED_TERM,
    payload: studentID,
});

export const deleteStudentFromSelectedTermSuccess = () => ({
    type: TermActionTypes.DELETE_STUDENT_FROM_SELECTED_TERM_SUCCESS,
});

export const deleteStudentFromSelectedTermFailure = (errors) => ({
    type: TermActionTypes.DELETE_STUDENT_FROM_SELECTED_TERM_FAILURE,
    payload: errors,
});

export const addStudentsToSelectedTerm = (studentIdsList) => ({
    type: TermActionTypes.ADD_STUDENTS_TO_SELECTED_TERM,
    payload: studentIdsList,
});

export const addStudentsToSelectedTermSuccess = (response) => ({
    type: TermActionTypes.ADD_STUDENTS_TO_SELECTED_TERM_SUCCESS,
    payload: response,
});

export const addStudentsToSelectedTermFailure = (errors) => ({
    type: TermActionTypes.ADD_STUDENTS_TO_SELECTED_TERM_FAILURE,
    payload: errors,
});
