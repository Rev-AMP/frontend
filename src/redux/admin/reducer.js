import AdminActionTypes from "./action.types";

const initState = {
    currentAdmin: null,
    errors: [],
    isLoading: false,
    selectedAdmin: null,
    admins: [],
};

const AdminReducer = (state = initState, action) => {
    switch (action.type) {
        case AdminActionTypes.FETCH_ADMINS:
            return {
                ...state,
                errors: [],
                isLoading: true,
                admins: [],
            };
        case AdminActionTypes.FETCH_ADMINS_SUCCESS:
            return {
                ...state,
                admins: action.payload,
                errors: [],
                isLoading: false,
            };
        case AdminActionTypes.FETCH_ADMINS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                admins: [],
            };

        case AdminActionTypes.UPDATE_ADMIN:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case AdminActionTypes.UPDATE_ADMIN_SUCCESS:
            return {
                ...state,
                selectedAdmin: action.payload,
                errors: [],
                isLoading: false,
            };
        case AdminActionTypes.UPDATE_ADMIN_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case AdminActionTypes.FETCH_ADMIN_ME:
            return {
                ...state,
                currentAdmin: null,
                errors: [],
                isLoading: true,
            };
        case AdminActionTypes.FETCH_ADMIN_ME_SUCCESS:
            return {
                ...state,
                currentAdmin: action.payload,
                errors: [],
                isLoading: false,
            };
        case AdminActionTypes.FETCH_ADMIN_ME_FAILURE:
            return {
                ...state,
                currentAdmin: null,
                errors: action.payload,
                isLoading: false,
            };

        case AdminActionTypes.FETCH_ADMIN:
            return {
                ...state,
                selectedAdmin: null,
                errors: [],
                isLoading: true,
            };
        case AdminActionTypes.FETCH_ADMIN_SUCCESS:
            return {
                ...state,
                selectedAdmin: action.payload,
                errors: [],
                isLoading: false,
            };
        case AdminActionTypes.FETCH_ADMIN_FAILURE:
            return {
                ...state,
                selectedAdmin: null,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default AdminReducer;
