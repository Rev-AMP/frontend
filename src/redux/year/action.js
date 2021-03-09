import YearActionTypes from "./action.types";

export const FetchYears = () => ({
    type: YearActionTypes.FETCH_YEARS,
});

export const FetchYearsSuccess = (years) => ({
    type: YearActionTypes.FETCH_YEARS_SUCCESS,
    payload: years,
});

export const FetchYearsFailure = (error) => ({
    type: YearActionTypes.FETCH_YEARS_FAILURE,
    payload: error,
});

export const FetchYear = (id) => ({
    type: YearActionTypes.FETCH_YEAR,
    payload: id,
});

export const FetchYearSuccess = (year) => ({
    type: YearActionTypes.FETCH_YEAR_SUCCESS,
    payload: year,
});

export const FetchYearFailure = (error) => ({
    type: YearActionTypes.FETCH_YEAR_FAILURE,
    payload: error,
});

export const UpdateYear = (yearUpdate) => ({
    type: YearActionTypes.UPDATE_YEAR,
    payload: yearUpdate,
});

export const UpdateYearSuccess = (year) => ({
    type: YearActionTypes.UPDATE_YEAR_SUCCESS,
    payload: year,
});

export const UpdateYearFailure = (error) => ({
    type: YearActionTypes.UPDATE_YEAR_FAILURE,
    payload: error,
});

export const CreateYear = (yearCreate) => ({
    type: YearActionTypes.CREATE_YEAR,
    payload: yearCreate,
});

export const CreateYearSuccess = (year) => ({
    type: YearActionTypes.CREATE_YEAR_SUCCESS,
    payload: year,
});

export const CreateYearFailure = (error) => ({
    type: YearActionTypes.CREATE_YEAR_FAILURE,
    payload: error,
});

export const DeleteYear = (yearId) => ({
    type: YearActionTypes.DELETE_YEAR,
    payload: yearId,
});

export const DeleteYearSuccess = () => ({
    type: YearActionTypes.DELETE_YEAR_SUCCESS,
});

export const DeleteYearFailure = (error) => ({
    type: YearActionTypes.DELETE_YEAR_FAILURE,
    payload: error,
});
