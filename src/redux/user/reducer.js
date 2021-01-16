import UserActionTypes from "./action.types";

const initState = {
    userDetails: null,
    errorMessage: "",
    isLoading: false
}

const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ME:
            return { ...state, userDetails: null, errorMessage: "", isLoading: true };
        case UserActionTypes.FETCH_USER_ME_SUCCESS:
            return { ...state, userDetails: action.payload, errorMessage: "", isLoading: false }
        case UserActionTypes.FETCH_USER_ME_FAILURE:
            return { ...state, userDetails: null, errorMessage: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default UserReducer;