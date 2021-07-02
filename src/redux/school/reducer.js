import SchoolActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    selectedSchool: null,
    schools: [],
    timeslots: [],
};

const SchoolReducer = (state = initState, action) => {
    switch (action.type) {
        case SchoolActionTypes.FETCH_SCHOOLS:
            return {
                ...state,
                errors: [],
                isLoading: true,
                schools: [],
            };
        case SchoolActionTypes.FETCH_SCHOOLS_SUCCESS:
            return {
                ...state,
                schools: action.payload,
                errors: [],
                isLoading: false,
            };
        case SchoolActionTypes.FETCH_SCHOOLS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                schools: [],
            };

        case SchoolActionTypes.FETCH_SCHOOL:
            return {
                ...state,
                selectedSchool: null,
                errors: [],
                isLoading: true,
            };
        case SchoolActionTypes.FETCH_SCHOOL_SUCCESS:
            return {
                ...state,
                selectedSchool: action.payload,
                errors: [],
                isLoading: false,
            };
        case SchoolActionTypes.FETCH_SCHOOL_FAILURE:
            return {
                ...state,
                selectedSchool: null,
                errors: action.payload,
                isLoading: false,
            };

        case SchoolActionTypes.FETCH_SCHOOL_TIME_SLOTS:
            return {
                ...state,
                errors: [],
                isLoading: true,
                timeslots: [],
            };
        case SchoolActionTypes.FETCH_SCHOOL_TIME_SLOTS_SUCCESS:
            return {
                ...state,
                timeslots: action.payload,
                errors: [],
                isLoading: false,
            };
        case SchoolActionTypes.FETCH_SCHOOL_TIME_SLOTS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                timeslots: [],
            };

        case SchoolActionTypes.UPDATE_SCHOOL:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case SchoolActionTypes.UPDATE_SCHOOL_SUCCESS:
            return {
                ...state,
                selectedSchool: action.payload,
                errors: [],
                isLoading: false,
            };
        case SchoolActionTypes.UPDATE_SCHOOL_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case SchoolActionTypes.CREATE_SCHOOL:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case SchoolActionTypes.CREATE_SCHOOL_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                selectedSchool: action.payload,
            };
        case SchoolActionTypes.CREATE_SCHOOL_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case SchoolActionTypes.DELETE_SCHOOL:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case SchoolActionTypes.DELETE_SCHOOL_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
            };
        case SchoolActionTypes.DELETE_SCHOOL_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default SchoolReducer;
