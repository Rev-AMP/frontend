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
