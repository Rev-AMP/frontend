import SchoolActionTypes from "./action.types";

export const FetchSchools = () => ({
    type: SchoolActionTypes.FETCH_SCHOOLS,
});

export const FetchSchoolsSuccess = (schools) => ({
    type: SchoolActionTypes.FETCH_SCHOOLS_SUCCESS,
    payload: schools,
});

export const FetchSchoolsFailure = (error) => ({
    type: SchoolActionTypes.FETCH_SCHOOLS_FAILURE,
    payload: error,
});

export const FetchSchool = (id) => ({
    type: SchoolActionTypes.FETCH_SCHOOL,
    payload: id,
});

export const FetchSchoolSuccess = (school) => ({
    type: SchoolActionTypes.FETCH_SCHOOL_SUCCESS,
    payload: school,
});

export const FetchSchoolFailure = (error) => ({
    type: SchoolActionTypes.FETCH_SCHOOL_FAILURE,
    payload: error,
});

export const UpdateSchool = (schoolUpdate) => ({
    type: SchoolActionTypes.UPDATE_SCHOOL,
    payload: schoolUpdate,
});

export const UpdateSchoolSuccess = (school) => ({
    type: SchoolActionTypes.UPDATE_SCHOOL_SUCCESS,
    payload: school,
});

export const UpdateSchoolFailure = (error) => ({
    type: SchoolActionTypes.UPDATE_SCHOOL_FAILURE,
    payload: error,
});

export const CreateSchool = (schoolCreate) => ({
    type: SchoolActionTypes.CREATE_SCHOOL,
    payload: schoolCreate,
});

export const CreateSchoolSuccess = (school) => ({
    type: SchoolActionTypes.CREATE_SCHOOL_SUCCESS,
    payload: school,
});

export const CreateSchoolFailure = (error) => ({
    type: SchoolActionTypes.CREATE_SCHOOL_FAILURE,
    payload: error,
});
