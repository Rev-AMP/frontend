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

        case AdminActionTypes.ADMIN_PERMISSION_FAILURE:
            return {
                ...state,
                errorMessage: `You do not have ${action.payload} permissions`,
            };

        default:
            return state;
    }
};

export default AdminReducer;
