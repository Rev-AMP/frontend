import { all, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import CourseActionTypes from "./action.types";
import {
    createCourseFailure,
    createCourseSuccess,
    fetchCourseSuccess,
    fetchCourseFailure,
    fetchCourses as ActionFetchCourses,
    fetchCoursesFailure,
    fetchCoursesSuccess,
    updateCourseFailure,
    updateCourseSuccess,
    deleteCourseSuccess,
    deleteCourseFailure,
} from "./action";
import { APICall } from "services/http-client";

function* fetchCourses() {
    yield takeEvery(CourseActionTypes.FETCH_COURSES, function* (action) {
        try {
            const courses = yield APICall(`/api/v1/courses/`, {
                method: "GET",
            });
            yield put(fetchCoursesSuccess(courses));
        } catch (error) {
            yield put(fetchCoursesFailure(error.detail));
        }
    });
}

function* createCourse() {
    yield takeEvery(CourseActionTypes.CREATE_COURSE, function* (action) {
        try {
            const course = yield APICall(`/api/v1/courses/`, {
                method: "POST",
                body: JSON.stringify(action.payload),
            });
            yield put(createCourseSuccess(course));
        } catch (error) {
            yield put(createCourseFailure(error.detail));
        }
    });
}

function* fetchCourse() {
    yield takeEvery(CourseActionTypes.FETCH_COURSE, function* (action) {
        try {
            const course = yield APICall(`/api/v1/courses/${action.payload}`, {
                method: "GET",
            });
            yield put(fetchCourseSuccess(course));
        } catch (error) {
            yield put(fetchCourseFailure(error.detail));
        }
    });
}

function* updateCourse() {
    yield takeEvery(CourseActionTypes.UPDATE_COURSE, function* (action) {
        try {
            const selectedCourse = yield select((state) => state.course.selectedCourse);
            const course = yield APICall(`/api/v1/courses/${selectedCourse.id}`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            yield put(updateCourseSuccess(course));
        } catch (error) {
            yield put(updateCourseFailure(error.detail));
        }
    });
}

function* deleteCourse() {
    yield takeEvery(CourseActionTypes.DELETE_COURSE, function* (action) {
        try {
            yield APICall(`/api/v1/courses/${action.payload}`, {
                method: "DELETE",
            });
            yield put(deleteCourseSuccess());
        } catch (error) {
            yield put(deleteCourseFailure(error.detail));
        }
    });
}

function* refreshCourseList() {
    yield takeLatest(
        [
            CourseActionTypes.UPDATE_COURSE_SUCCESS,
            CourseActionTypes.CREATE_COURSE_SUCCESS,
            CourseActionTypes.DELETE_COURSE_SUCCESS,
        ],
        function* (action) {
            yield put(ActionFetchCourses());
        }
    );
}

function* courseMethods() {
    yield all([fetchCourses(), fetchCourse(), updateCourse(), createCourse(), deleteCourse(), refreshCourseList()]);
}

export default courseMethods;
