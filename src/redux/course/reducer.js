import CourseActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    selectedCourse: null,
    courses: [],
};

const CourseReducer = (state = initState, action) => {
    switch (action.type) {
        case CourseActionTypes.FETCH_COURSES:
            return {
                ...state,
                errors: [],
                isLoading: true,
                courses: [],
            };
        case CourseActionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.payload,
                errors: [],
                isLoading: false,
            };
        case CourseActionTypes.FETCH_COURSES_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                courses: [],
            };

        case CourseActionTypes.CREATE_COURSE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case CourseActionTypes.CREATE_COURSE_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                selectedCourse: action.payload,
            };
        case CourseActionTypes.CREATE_COURSE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case CourseActionTypes.FETCH_COURSE:
            return {
                ...state,
                selectedCourse: null,
                errors: [],
                isLoading: true,
            };
        case CourseActionTypes.FETCH_COURSE_SUCCESS:
            return {
                ...state,
                selectedCourse: action.payload,
                errors: [],
                isLoading: false,
            };
        case CourseActionTypes.FETCH_COURSE_FAILURE:
            return {
                ...state,
                selectedCourse: null,
                errors: action.payload,
                isLoading: false,
            };

        case CourseActionTypes.UPDATE_COURSE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case CourseActionTypes.UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                selectedCourse: action.payload,
                errors: [],
                isLoading: false,
            };
        case CourseActionTypes.UPDATE_COURSE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case CourseActionTypes.DELETE_COURSE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case CourseActionTypes.DELETE_COURSE_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
            };
        case CourseActionTypes.DELETE_COURSE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default CourseReducer;
