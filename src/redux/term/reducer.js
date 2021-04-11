import TermActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    selectedTerm: null,
    terms: [],
    studentsForTerm: null,
};

const TermReducer = (state = initState, action) => {
    switch (action.type) {
        case TermActionTypes.FETCH_TERMS:
            return {
                ...state,
                errors: [],
                    isLoading: true,
                    terms: [],
            };
        case TermActionTypes.FETCH_TERMS_SUCCESS:
            return {
                ...state,
                terms: action.payload,
                    errors: [],
                    isLoading: false,
            };
        case TermActionTypes.FETCH_TERMS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                    isLoading: false,
                    terms: [],
            };

        case TermActionTypes.FETCH_TERM:
            return {
                ...state,
                selectedTerm: null,
                    errors: [],
                    isLoading: true,
            };
        case TermActionTypes.FETCH_TERM_SUCCESS:
            return {
                ...state,
                selectedTerm: action.payload,
                    errors: [],
                    isLoading: false,
            };
        case TermActionTypes.FETCH_TERM_FAILURE:
            return {
                ...state,
                selectedTerm: null,
                    errors: action.payload,
                    isLoading: false,
            };

        case TermActionTypes.UPDATE_TERM:
            return {
                ...state,
                errors: [],
                    isLoading: true,
            };
        case TermActionTypes.UPDATE_TERM_SUCCESS:
            return {
                ...state,
                selectedTerm: action.payload,
                    errors: [],
                    isLoading: false,
            };
        case TermActionTypes.UPDATE_TERM_FAILURE:
            return {
                ...state,
                errors: action.payload,
                    isLoading: false,
            };

        case TermActionTypes.CREATE_TERM:
            return {
                ...state,
                errors: [],
                    isLoading: true,
            };
        case TermActionTypes.CREATE_TERM_SUCCESS:
            return {
                ...state,
                errors: [],
                    isLoading: false,
                    selectedTerm: action.payload,
            };
        case TermActionTypes.CREATE_TERM_FAILURE:
            return {
                ...state,
                errors: action.payload,
                    isLoading: false,
            };

        case TermActionTypes.DELETE_TERM:
            return {
                ...state,
                errors: [],
                    isLoading: true,
            };
        case TermActionTypes.DELETE_TERM_SUCCESS:
            return {
                ...state,
                errors: [],
                    isLoading: false,
            };
        case TermActionTypes.DELETE_TERM_FAILURE:
            return {
                ...state,
                errors: action.payload,
                    isLoading: false,
            };

        case TermActionTypes.FETCH_STUDENTS_FOR_TERM:
            return {
                ...state,
                errors: [],
                    isLoading: true,
            };

        case TermActionTypes.FETCH_STUDENTS_FOR_TERM_SUCCESS:
            return {
                ...state,
                errors: [],
                    isLoading: false,
                    studentsForTerm: action.payload
            };

        case TermActionTypes.FETCH_STUDENTS_FOR_TERM_FAILURE:
            return {
                ...state,
                errors: action.payload,
                    isLoading: false
            };

        default:
            return state;
    }
};

export default TermReducer;