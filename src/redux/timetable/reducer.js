import TimetableActionTypes from "./action.types";

const initState = {
    timetable: null,
    isLoading: false,
    errors: [],
};

const TimetableReducer = (state = initState, action) => {
    switch (action.type) {
        case TimetableActionTypes.FETCH_TIMETABLE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };

        case TimetableActionTypes.FETCH_TIMETABLE_SUCCESS:
            return {
                ...state,
                timetable: action.payload,
                errors: [],
                isLoading: false,
            };

        case TimetableActionTypes.FETCH_TIMETABLE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default TimetableReducer;
