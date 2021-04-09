import YearActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    selectedYear: null,
    years: [],
};

const YearReducer = (state = initState, action) => {
    switch (action.type) {
        case YearActionTypes.FETCH_YEARS:
            return {
                ...state,
                errors: [],
                isLoading: true,
                years: [],
            };
        case YearActionTypes.FETCH_YEARS_SUCCESS:
            return {
                ...state,
                years: action.payload,
                errors: [],
                isLoading: false,
            };
        case YearActionTypes.FETCH_YEARS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                years: [],
            };

        case YearActionTypes.FETCH_YEAR:
            return {
                ...state,
                selectedYear: null,
                errors: [],
                isLoading: true,
            };
        case YearActionTypes.FETCH_YEAR_SUCCESS:
            return {
                ...state,
                selectedYear: action.payload,
                errors: [],
                isLoading: false,
            };
        case YearActionTypes.FETCH_YEAR_FAILURE:
            return {
                ...state,
                selectedYear: null,
                errors: action.payload,
                isLoading: false,
            };

        case YearActionTypes.UPDATE_YEAR:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case YearActionTypes.UPDATE_YEAR_SUCCESS:
            return {
                ...state,
                selectedYear: action.payload,
                errors: [],
                isLoading: false,
            };
        case YearActionTypes.UPDATE_YEAR_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case YearActionTypes.CREATE_YEAR:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case YearActionTypes.CREATE_YEAR_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                selectedYear: action.payload,
            };
        case YearActionTypes.CREATE_YEAR_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case YearActionTypes.DELETE_YEAR:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case YearActionTypes.DELETE_YEAR_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
            };
        case YearActionTypes.DELETE_YEAR_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default YearReducer;
