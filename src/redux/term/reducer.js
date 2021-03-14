import TermActionTypes from "./action.types";

const initState = {
    errorMessage: "",
    isLoading: false,
    selectedTerm: null,
    terms: [],
};

const TermReducer = (state = initState, action) => {
    switch (action.type) {
        case TermActionTypes.FETCH_TERMS:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
                terms: [],
            };
        case TermActionTypes.FETCH_TERMS_SUCCESS:
            return {
                ...state,
                terms: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case TermActionTypes.FETCH_TERMS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                terms: [],
            };

        case TermActionTypes.FETCH_TERM:
            return {
                ...state,
                selectedTerm: null,
                errorMessage: "",
                isLoading: true,
            };
        case TermActionTypes.FETCH_TERM_SUCCESS:
            return {
                ...state,
                selectedTerm: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case TermActionTypes.FETCH_TERM_FAILURE:
            return {
                ...state,
                selectedTerm: null,
                errorMessage: action.payload,
                isLoading: false,
            };

        case TermActionTypes.UPDATE_TERM:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case TermActionTypes.UPDATE_TERM_SUCCESS:
            return {
                ...state,
                selectedTerm: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case TermActionTypes.UPDATE_TERM_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case TermActionTypes.CREATE_TERM:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case TermActionTypes.CREATE_TERM_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                selectedTerm: action.payload,
            };
        case TermActionTypes.CREATE_TERM_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case TermActionTypes.DELETE_TERM:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case TermActionTypes.DELETE_TERM_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
            };
        case TermActionTypes.DELETE_TERM_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default TermReducer;
