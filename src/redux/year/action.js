import YearActionTypes from "./action.types";

export const FetchYears = () => ({
    type: YearActionTypes.FETCH_YEARS,
});

export const FetchYearsSuccess = (schools) => ({
    type: YearActionTypes.FETCH_YEARS_SUCCESS,
    payload: schools,
});

export const FetchYearsFailure = (error) => ({
    type: YearActionTypes.FETCH_YEARS_FAILURE,
    payload: error,
});

export const FetchYear = (id) => ({
    type: YearActionTypes.FETCH_YEAR,
    payload: id,
});

export const FetchYearSuccess = (school) => ({
    type: YearActionTypes.FETCH_YEAR_SUCCESS,
    payload: school,
});

export const FetchYearFailure = (error) => ({
    type: YearActionTypes.FETCH_YEAR_FAILURE,
    payload: error,
});

export const UpdateYear = (schoolUpdate) => ({
    type: YearActionTypes.UPDATE_YEAR,
    payload: schoolUpdate,
});

export const UpdateYearSuccess = (school) => ({
    type: YearActionTypes.UPDATE_YEAR_SUCCESS,
    payload: school,
});

export const UpdateYearFailure = (error) => ({
    type: YearActionTypes.UPDATE_YEAR_FAILURE,
    payload: error,
});

export const CreateYear = (schoolCreate) => ({
    type: YearActionTypes.CREATE_YEAR,
    payload: schoolCreate,
});

export const CreateYearSuccess = (school) => ({
    type: YearActionTypes.CREATE_YEAR_SUCCESS,
    payload: school,
});

export const CreateYearFailure = (error) => ({
    type: YearActionTypes.CREATE_YEAR_FAILURE,
    payload: error,
});

export const DeleteYear = () => ({
    type: YearActionTypes.DELETE_YEAR,
});

export const DeleteYearSuccess = () => ({
    type: YearActionTypes.DELETE_YEAR_SUCCESS,
});

export const DeleteYearFailure = (error) => ({
    type: YearActionTypes.DELETE_YEAR_FAILURE,
    payload: error,
});
