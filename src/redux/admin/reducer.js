import AdminActionTypes from "./action.types";

const initState = {
    currentAdmin: null,
    errorMessage: "",
    isLoading: false,
    selectedAdmin: null,
    admins: [],
};

const AdminReducer = (state = initState, action) => {
    switch (action.type) {
        case AdminActionTypes.FETCH_ADMINS:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
                admins: [],
            };
        case AdminActionTypes.FETCH_ADMINS_SUCCESS:
            return {
                ...state,
                admins: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case AdminActionTypes.FETCH_ADMINS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                admins: [],
            };

        case AdminActionTypes.UPDATE_ADMIN:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case AdminActionTypes.UPDATE_ADMIN_SUCCESS:
            return {
                ...state,
                selectedAdmin: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case AdminActionTypes.UPDATE_ADMIN_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

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

        case AdminActionTypes.FETCH_ADMIN:
            return {
                ...state,
                selectedAdmin: null,
                errorMessage: "",
                isLoading: true,
            };
        case AdminActionTypes.FETCH_ADMIN_SUCCESS:
            return {
                ...state,
                selectedAdmin: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case AdminActionTypes.FETCH_ADMIN_FAILURE:
            return {
                ...state,
                selectedAdmin: null,
                errorMessage: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default AdminReducer;
