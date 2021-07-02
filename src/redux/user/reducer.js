import UserActionTypes from "./action.types";

const initState = {
    currentUser: null,
    errors: [],
    isLoading: false,
    selectedUser: null,
    users: [],
    professors: [],
    professorDivisions: [],
};

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ME:
            return {
                ...state,
                currentUser: null,
                errors: [],
                isLoading: true,
                selectedUser: null,
            };
        case UserActionTypes.FETCH_USER_ME_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                errors: [],
                isLoading: false,
                selectedUser: null,
            };
        case UserActionTypes.FETCH_USER_ME_FAILURE:
            return {
                ...state,
                currentUser: null,
                errors: action.payload,
                isLoading: false,
                selectedUser: null,
            };

        case UserActionTypes.UPDATE_USER_ME:
            return {
                ...state,
                isLoading: true,
                errors: [],
                selectedUser: null,
            };
        case UserActionTypes.UPDATE_USER_ME_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                errors: [],
                isLoading: false,
                selectedUser: null,
            };
        case UserActionTypes.UPDATE_USER_ME_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                selectedUser: null,
            };

        case UserActionTypes.FETCH_USER:
            return {
                ...state,
                selectedUser: null,
                errors: [],
                isLoading: true,
            };
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                selectedUser: action.payload,
                errors: [],
                isLoading: false,
            };
        case UserActionTypes.FETCH_USER_FAILURE:
            return {
                ...state,
                selectedUser: null,
                errors: action.payload,
                isLoading: false,
            };

        case UserActionTypes.FETCH_USERS:
            return { ...state, errors: [], isLoading: true, users: [] };
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                errors: [],
                isLoading: false,
            };
        case UserActionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                users: [],
            };

        case UserActionTypes.UPDATE_USER:
            return { ...state, errors: [], isLoading: true };
        case UserActionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                selectedUser: action.payload,
                errors: [],
                isLoading: false,
            };
        case UserActionTypes.UPDATE_USER_FAILURE:
            return { ...state, errors: action.payload, isLoading: false };

        case UserActionTypes.CREATE_USER:
            return { ...state, errors: [], isLoading: true };
        case UserActionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                selectedUser: action.payload,
            };
        case UserActionTypes.CREATE_USER_FAILURE:
            return { ...state, errors: action.payload, isLoading: false };

        case UserActionTypes.FETCH_PROFESSORS:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case UserActionTypes.FETCH_PROFESSORS_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                professors: action.payload,
            };
        case UserActionTypes.FETCH_PROFESSORS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case UserActionTypes.FETCH_PROFESSOR_DIVISIONS:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case UserActionTypes.FETCH_PROFESSOR_DIVISIONS_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                professorDivisions: action.payload,
            };
        case UserActionTypes.FETCH_PROFESSOR_DIVISIONS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default UserReducer;
