import YearActionTypes from "./action.types";

export const fetchYears = () => ({
    type: YearActionTypes.FETCH_YEARS,
});

export const fetchYearsSuccess = (years) => ({
    type: YearActionTypes.FETCH_YEARS_SUCCESS,
    payload: years,
});

export const fetchYearsFailure = (errors) => ({
    type: YearActionTypes.FETCH_YEARS_FAILURE,
    payload: errors,
});

export const fetchYear = (id) => ({
    type: YearActionTypes.FETCH_YEAR,
    payload: id,
});

export const fetchYearSuccess = (year) => ({
    type: YearActionTypes.FETCH_YEAR_SUCCESS,
    payload: year,
});

export const fetchYearFailure = (errors) => ({
    type: YearActionTypes.FETCH_YEAR_FAILURE,
    payload: errors,
});

export const updateYear = (yearUpdate) => ({
    type: YearActionTypes.UPDATE_YEAR,
    payload: yearUpdate,
});

export const updateYearSuccess = (year) => ({
    type: YearActionTypes.UPDATE_YEAR_SUCCESS,
    payload: year,
});

export const updateYearFailure = (errors) => ({
    type: YearActionTypes.UPDATE_YEAR_FAILURE,
    payload: errors,
});

export const createYear = (yearCreate) => ({
    type: YearActionTypes.CREATE_YEAR,
    payload: yearCreate,
});

export const createYearSuccess = (year) => ({
    type: YearActionTypes.CREATE_YEAR_SUCCESS,
    payload: year,
});

export const createYearFailure = (errors) => ({
    type: YearActionTypes.CREATE_YEAR_FAILURE,
    payload: errors,
});

export const deleteYear = (yearId) => ({
    type: YearActionTypes.DELETE_YEAR,
    payload: yearId,
});

export const deleteYearSuccess = () => ({
    type: YearActionTypes.DELETE_YEAR_SUCCESS,
});

export const deleteYearFailure = (errors) => ({
    type: YearActionTypes.DELETE_YEAR_FAILURE,
    payload: errors,
});
