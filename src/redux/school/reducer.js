import SchoolActionTypes from "./action.types";

const initState = {
    errorMessage: "",
    isLoading: false,
    selectedSchool: null,
    schools: [],
};

const SchoolReducer = (state = initState, action) => {
    switch (action.type) {
        case SchoolActionTypes.FETCH_SCHOOLS:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
                schools: [],
            };
        case SchoolActionTypes.FETCH_SCHOOLS_SUCCESS:
            return {
                ...state,
                schools: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case SchoolActionTypes.FETCH_SCHOOLS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                schools: [],
            };

        case SchoolActionTypes.FETCH_SCHOOL:
            return {
                ...state,
                selectedSchool: null,
                errorMessage: "",
                isLoading: true,
            };
        case SchoolActionTypes.FETCH_SCHOOL_SUCCESS:
            return {
                ...state,
                selectedSchool: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case SchoolActionTypes.FETCH_SCHOOL_FAILURE:
            return {
                ...state,
                selectedSchool: null,
                errorMessage: action.payload,
                isLoading: false,
            };

        case SchoolActionTypes.UPDATE_SCHOOL:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case SchoolActionTypes.UPDATE_SCHOOL_SUCCESS:
            return {
                ...state,
                selectedSchool: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case SchoolActionTypes.UPDATE_SCHOOL_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case SchoolActionTypes.CREATE_SCHOOL:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case SchoolActionTypes.CREATE_SCHOOL_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                selectedSchool: action.payload,
            };
        case SchoolActionTypes.CREATE_SCHOOL_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case SchoolActionTypes.DELETE_SCHOOL:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case SchoolActionTypes.DELETE_SCHOOL_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
            };
        case SchoolActionTypes.DELETE_SCHOOL_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default SchoolReducer;
