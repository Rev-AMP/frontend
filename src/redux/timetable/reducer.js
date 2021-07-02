import TimetableActionTypes from "./action.types";

const initState = {
    timetable: null,
    isLoading: false,
    errors: [],
    lecture: null,
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

        case TimetableActionTypes.FETCH_TIMETABLE_DIVISION:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };

        case TimetableActionTypes.FETCH_TIMETABLE_DIVISION_SUCCESS:
            return {
                ...state,
                timetable: action.payload,
                errors: [],
                isLoading: false,
            };

        case TimetableActionTypes.FETCH_TIMETABLE_DIVISION_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case TimetableActionTypes.FETCH_LECTURE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case TimetableActionTypes.FETCH_LECTURE_SUCCESS:
            return {
                ...state,
                lecture: action.payload,
                errors: [],
                isLoading: false,
            };
        case TimetableActionTypes.FETCH_LECTURE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case TimetableActionTypes.UPDATE_LECTURE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case TimetableActionTypes.UPDATE_LECTURE_SUCCESS:
            return {
                ...state,
                lecture: action.payload,
                errors: [],
                isLoading: false,
            };
        case TimetableActionTypes.UPDATE_LECTURE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case TimetableActionTypes.CREATE_LECTURE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case TimetableActionTypes.CREATE_LECTURE_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                lecture: action.payload,
            };
        case TimetableActionTypes.CREATE_LECTURE_FAILURE:
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
