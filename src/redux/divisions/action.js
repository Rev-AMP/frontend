import DivisionActionTypes from "./action.types";

export const fetchDivisions = () => ({
    type: DivisionActionTypes.FETCH_DIVISIONS
});

export const fetchDivisionsSuccess = (divisions) => ({
    type: DivisionActionTypes.FETCH_DIVISIONS_SUCCESS,
    payload: divisions
});

export const fetchDivisionsFailure = (errors) => ({
    type: DivisionActionTypes.FETCH_DIVISIONS_FAILURE,
    payload: errors
});