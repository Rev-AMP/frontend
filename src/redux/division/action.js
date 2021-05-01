import DivisionActionTypes from "./action.types";

export const fetchDivisions = () => ({
    type: DivisionActionTypes.FETCH_DIVISIONS,
});

export const fetchDivisionsSuccess = (divisions) => ({
    type: DivisionActionTypes.FETCH_DIVISIONS_SUCCESS,
    payload: divisions,
});

export const fetchDivisionsFailure = (errors) => ({
    type: DivisionActionTypes.FETCH_DIVISIONS_FAILURE,
    payload: errors,
});

export const deleteDivision = (divisionId) => ({
    type: DivisionActionTypes.DELETE_DIVISION,
    payload: divisionId,
});

export const deleteDivisionSuccess = () => ({
    type: DivisionActionTypes.DELETE_DIVISION_SUCCESS,
});

export const deleteDivisionFailure = (errors) => ({
    type: DivisionActionTypes.DELETE_DIVISION_FAILURE,
    payload: errors,
});

export const fetchDivision = (divisionId) => ({
    type: DivisionActionTypes.FETCH_DIVISION,
    payload: divisionId,
});

export const fetchDivisionSuccess = (division) => ({
    type: DivisionActionTypes.FETCH_DIVISION_SUCCESS,
    payload: division,
});

export const fetchDivisionFailure = (errors) => ({
    type: DivisionActionTypes.FETCH_DIVISION_FAILURE,
    payload: errors,
});

export const createDivision = (division) => ({
    type: DivisionActionTypes.CREATE_DIVISION,
    payload: division,
});

export const createDivisionSuccess = (division) => ({
    type: DivisionActionTypes.CREATE_DIVISION_SUCCESS,
    payload: division,
});

export const createDivisionFailure = (errors) => ({
    type: DivisionActionTypes.CREATE_DIVISION_FAILURE,
    payload: errors,
});

export const updateDivision = (divisionUpdate) => ({
    type: DivisionActionTypes.UPDATE_DIVISION,
    payload: divisionUpdate,
});

export const updateDivisionSuccess = (division) => ({
    type: DivisionActionTypes.UPDATE_DIVISION_SUCCESS,
    payload: division,
});

export const updateDivisionFailure = (errors) => ({
    type: DivisionActionTypes.UPDATE_DIVISION_FAILURE,
    payload: errors,
});

export const fetchStudentsForSelectedDivision = () => ({
    type: DivisionActionTypes.FETCH_STUDENTS_FOR_SELECTED_DIVISION,
});

export const fetchStudentsForSelectedDivisionSuccess = (students) => ({
    type: DivisionActionTypes.FETCH_STUDENTS_FOR_SELECTED_DIVISION_SUCCESS,
    payload: students,
});

export const fetchStudentsForSelectedDivisionFailure = (errors) => ({
    type: DivisionActionTypes.FETCH_STUDENTS_FOR_SELECTED_DIVISION_FAILURE,
    payload: errors,
});

export const deleteStudentFromSelectedDivision = (studentID) => ({
    type: DivisionActionTypes.DELETE_STUDENT_FROM_SELECTED_DIVISION,
    payload: studentID,
});

export const deleteStudentFromSelectedDivisionSuccess = () => ({
    type: DivisionActionTypes.DELETE_STUDENT_FROM_SELECTED_DIVISION_SUCCESS,
});

export const deleteStudentFromSelectedDivisionFailure = (errors) => ({
    type: DivisionActionTypes.DELETE_STUDENT_FROM_SELECTED_DIVISION_FAILURE,
    payload: errors,
});

export const addStudentsToSelectedDivision = (studentIdsList) => ({
    type: DivisionActionTypes.ADD_STUDENTS_TO_SELECTED_DIVISION,
    payload: studentIdsList,
});

export const addStudentsToSelectedDivisionSuccess = (response) => ({
    type: DivisionActionTypes.ADD_STUDENTS_TO_SELECTED_DIVISION_SUCCESS,
    payload: response,
});

export const addStudentsToSelectedDivisionFailure = (errors) => ({
    type: DivisionActionTypes.ADD_STUDENTS_TO_SELECTED_DIVISION_FAILURE,
    payload: errors,
});
