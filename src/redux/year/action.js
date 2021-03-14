import YearActionTypes from "./action.types";

export const fetchYears = () => ({
    type: YearActionTypes.FETCH_YEARS,
});

export const fetchYearsSuccess = (years) => ({
    type: YearActionTypes.FETCH_YEARS_SUCCESS,
    payload: years,
});

export const fetchYearsFailure = (error) => ({
    type: YearActionTypes.FETCH_YEARS_FAILURE,
    payload: error,
});

export const fetchYear = (id) => ({
    type: YearActionTypes.FETCH_YEAR,
    payload: id,
});

export const fetchYearSuccess = (year) => ({
    type: YearActionTypes.FETCH_YEAR_SUCCESS,
    payload: year,
});

export const fetchYearFailure = (error) => ({
    type: YearActionTypes.FETCH_YEAR_FAILURE,
    payload: error,
});

export const updateYear = (yearUpdate) => ({
    type: YearActionTypes.UPDATE_YEAR,
    payload: yearUpdate,
});

export const updateYearSuccess = (year) => ({
    type: YearActionTypes.UPDATE_YEAR_SUCCESS,
    payload: year,
});

export const updateYearFailure = (error) => ({
    type: YearActionTypes.UPDATE_YEAR_FAILURE,
    payload: error,
});

export const createYear = (yearCreate) => ({
    type: YearActionTypes.CREATE_YEAR,
    payload: yearCreate,
});

export const createYearSuccess = (year) => ({
    type: YearActionTypes.CREATE_YEAR_SUCCESS,
    payload: year,
});

export const createYearFailure = (error) => ({
    type: YearActionTypes.CREATE_YEAR_FAILURE,
    payload: error,
});

export const deleteYear = (yearId) => ({
    type: YearActionTypes.DELETE_YEAR,
    payload: yearId,
});

export const deleteYearSuccess = () => ({
    type: YearActionTypes.DELETE_YEAR_SUCCESS,
});

export const deleteYearFailure = (error) => ({
    type: YearActionTypes.DELETE_YEAR_FAILURE,
    payload: error,
});
