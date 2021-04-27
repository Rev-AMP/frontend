import DivisionActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    divisions: [],
};

const DivisionReducer = (state = initState, action) => {
    switch (action.type) {
        case DivisionActionTypes.FETCH_DIVISIONS:
            return {
                ...state,
                errors: [],
                isLoading: true,
                divisions: [],
            };
        case DivisionActionTypes.FETCH_DIVISIONS_SUCCESS:
            return {
                ...state,
                divisions: action.payload,
                errors: [],
                isLoading: false,
            };
        case DivisionActionTypes.FETCH_DIVISIONS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                divisions: [],
            };

        case DivisionActionTypes.DELETE_DIVISION:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };

        case DivisionActionTypes.DELETE_DIVISION_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
            };

        case DivisionActionTypes.DELETE_DIVISION_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default DivisionReducer;
