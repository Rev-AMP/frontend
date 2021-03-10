import YearActionTypes from "./action.types";

const initState = {
    errorMessage: "",
    isLoading: false,
    selectedYear: null,
    years: [],
};

const YearReducer = (state = initState, action) => {
    switch (action.type) {
        case YearActionTypes.FETCH_YEARS:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
                years: [],
            };
        case YearActionTypes.FETCH_YEARS_SUCCESS:
            return {
                ...state,
                years: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case YearActionTypes.FETCH_YEARS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                years: [],
            };

        case YearActionTypes.FETCH_YEAR:
            return {
                ...state,
                selectedYear: null,
                errorMessage: "",
                isLoading: true,
            };
        case YearActionTypes.FETCH_YEAR_SUCCESS:
            return {
                ...state,
                selectedYear: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case YearActionTypes.FETCH_YEAR_FAILURE:
            return {
                ...state,
                selectedYear: null,
                errorMessage: action.payload,
                isLoading: false,
            };

        case YearActionTypes.UPDATE_YEAR:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case YearActionTypes.UPDATE_YEAR_SUCCESS:
            return {
                ...state,
                selectedYear: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case YearActionTypes.UPDATE_YEAR_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case YearActionTypes.CREATE_YEAR:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case YearActionTypes.CREATE_YEAR_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                selectedYear: action.payload,
            };
        case YearActionTypes.CREATE_YEAR_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case YearActionTypes.DELETE_YEAR:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case YearActionTypes.DELETE_YEAR_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
            };
        case YearActionTypes.DELETE_YEAR_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default YearReducer;
