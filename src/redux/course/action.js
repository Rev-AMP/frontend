import CourseActionTypes from "./action.types";

export const fetchCourses = () => ({
    type: CourseActionTypes.FETCH_COURSES,
});
export const fetchCoursesSuccess = (courses) => ({
    type: CourseActionTypes.FETCH_COURSES_SUCCESS,
    payload: courses,
});
export const fetchCoursesFailure = (errors) => ({
    type: CourseActionTypes.FETCH_COURSES_FAILURE,
    payload: errors,
});

export const createCourse = (courseCreate) => ({
    type: CourseActionTypes.CREATE_COURSE,
    payload: courseCreate,
});
export const createCourseSuccess = (course) => ({
    type: CourseActionTypes.CREATE_COURSE_SUCCESS,
    payload: course,
});
export const createCourseFailure = (errors) => ({
    type: CourseActionTypes.CREATE_COURSE_FAILURE,
    payload: errors,
});

export const fetchCourse = (id) => ({
    type: CourseActionTypes.FETCH_COURSE,
    payload: id,
});
export const fetchCourseSuccess = (course) => ({
    type: CourseActionTypes.FETCH_COURSE_SUCCESS,
    payload: course,
});
export const fetchCourseFailure = (errors) => ({
    type: CourseActionTypes.FETCH_COURSE_FAILURE,
    payload: errors,
});

export const updateCourse = (courseUpdate) => ({
    type: CourseActionTypes.UPDATE_COURSE,
    payload: courseUpdate,
});
export const updateCourseSuccess = (course) => ({
    type: CourseActionTypes.UPDATE_COURSE_SUCCESS,
    payload: course,
});
export const updateCourseFailure = (errors) => ({
    type: CourseActionTypes.UPDATE_COURSE_FAILURE,
    payload: errors,
});

export const deleteCourse = (courseId) => ({
    type: CourseActionTypes.DELETE_COURSE,
    payload: courseId,
});
export const deleteCourseSuccess = () => ({
    type: CourseActionTypes.DELETE_COURSE_SUCCESS,
});
export const deleteCourseFailure = (errors) => ({
    type: CourseActionTypes.DELETE_COURSE_FAILURE,
    payload: errors,
});
