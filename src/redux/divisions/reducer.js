import DivisionActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    divisions: []
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

        default:
            return state;
    }
}

export default DivisionReducer;