import UserActionTypes from "./action.types";

const initState = {
    currentUser: null,
    errorMessage: "",
    isLoading: false
}

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ME:
            return { ...state, currentUser: null, errorMessage: "", isLoading: true };
        case UserActionTypes.FETCH_USER_ME_SUCCESS:
            return { ...state, currentUser: action.payload, errorMessage: "", isLoading: false }
        case UserActionTypes.FETCH_USER_ME_FAILURE:
            return { ...state, currentUser: null, errorMessage: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default UserReducer;