import CourseActionTypes from "./action.types";

const initState = {
    errorMessage: "",
    isLoading: false,
    selectedCourse: null,
    courses: [],
};

const CourseReducer = (state = initState, action) => {
    switch (action.type) {
        case CourseActionTypes.FETCH_COURSES:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
                courses: [],
            };
        case CourseActionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case CourseActionTypes.FETCH_COURSES_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                courses: [],
            };

        case CourseActionTypes.CREATE_COURSE:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case CourseActionTypes.CREATE_COURSE_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                selectedCourse: action.payload,
            };
        case CourseActionTypes.CREATE_COURSE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case CourseActionTypes.FETCH_COURSE:
            return {
                ...state,
                selectedCourse: null,
                errorMessage: "",
                isLoading: true,
            };
        case CourseActionTypes.FETCH_COURSE_SUCCESS:
            return {
                ...state,
                selectedCourse: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case CourseActionTypes.FETCH_COURSE_FAILURE:
            return {
                ...state,
                selectedCourse: null,
                errorMessage: action.payload,
                isLoading: false,
            };

        case CourseActionTypes.UPDATE_COURSE:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case CourseActionTypes.UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                selectedCourse: action.payload,
                errorMessage: "",
                isLoading: false,
            };
        case CourseActionTypes.UPDATE_COURSE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        case CourseActionTypes.DELETE_COURSE:
            return {
                ...state,
                errorMessage: "",
                isLoading: true,
            };
        case CourseActionTypes.DELETE_COURSE_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
            };
        case CourseActionTypes.DELETE_COURSE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default CourseReducer;
