import AdminActionTypes from "./action.types";

const initState = {
    currentAdmin: null,
    errorMessage: "",
    isLoading: false,
};

const AdminReducer = (state = initState, action) => {
    switch (action.type) {
        case AdminActionTypes.FETCH_ADMIN_ME:
            return {
                ...state,
                currentAdmin: null,
                errorMessage: "",
                isLoading: true,
            };
        case AdminActionTypes.FETCH_ADMIN_ME_SUCCESS:
            return {
                ...state,
                currentAdmin: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case AdminActionTypes.FETCH_ADMIN_ME_FAILURE:
            return {
                ...state,
                currentAdmin: null,
                errorMessage: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default AdminReducer;
