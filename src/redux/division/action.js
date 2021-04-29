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
