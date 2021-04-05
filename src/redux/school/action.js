import SchoolActionTypes from "./action.types";

export const fetchSchools = () => ({
    type: SchoolActionTypes.FETCH_SCHOOLS,
});

export const fetchSchoolsSuccess = (schools) => ({
    type: SchoolActionTypes.FETCH_SCHOOLS_SUCCESS,
    payload: schools,
});

export const fetchSchoolsFailure = (errors) => ({
    type: SchoolActionTypes.FETCH_SCHOOLS_FAILURE,
    payload: errors,
});

export const fetchSchool = (id) => ({
    type: SchoolActionTypes.FETCH_SCHOOL,
    payload: id,
});

export const fetchSchoolSuccess = (school) => ({
    type: SchoolActionTypes.FETCH_SCHOOL_SUCCESS,
    payload: school,
});

export const fetchSchoolFailure = (errors) => ({
    type: SchoolActionTypes.FETCH_SCHOOL_FAILURE,
    payload: errors,
});

export const updateSchool = (schoolUpdate) => ({
    type: SchoolActionTypes.UPDATE_SCHOOL,
    payload: schoolUpdate,
});

export const updateSchoolSuccess = (school) => ({
    type: SchoolActionTypes.UPDATE_SCHOOL_SUCCESS,
    payload: school,
});

export const updateSchoolFailure = (errors) => ({
    type: SchoolActionTypes.UPDATE_SCHOOL_FAILURE,
    payload: errors,
});

export const createSchool = (schoolCreate) => ({
    type: SchoolActionTypes.CREATE_SCHOOL,
    payload: schoolCreate,
});

export const createSchoolSuccess = (school) => ({
    type: SchoolActionTypes.CREATE_SCHOOL_SUCCESS,
    payload: school,
});

export const createSchoolFailure = (errors) => ({
    type: SchoolActionTypes.CREATE_SCHOOL_FAILURE,
    payload: errors,
});

export const deleteSchool = (schoolId) => ({
    type: SchoolActionTypes.DELETE_SCHOOL,
    payload: schoolId,
});

export const deleteSchoolSuccess = () => ({
    type: SchoolActionTypes.DELETE_SCHOOL_SUCCESS,
});

export const deleteSchoolFailure = (errors) => ({
    type: SchoolActionTypes.DELETE_SCHOOL_FAILURE,
    payload: errors,
});
