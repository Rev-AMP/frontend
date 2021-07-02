import { all, put, takeEvery } from "redux-saga/effects";

import FileActionTypes from "./action.types";

import {
    fetchFileFailure,
    fetchFilesCourseFailure,
    fetchFilesCourseSuccess,
    fetchFilesFailure,
    fetchFilesSubmissionIdFailure,
    fetchFilesSubmissionIdSuccess,
    fetchFilesSuccess,
    fetchFileSuccess,
    uploadFileFailure,
    uploadFileSuccess,
} from "./action";
import { APICall } from "services/http-client";
import { addFileURL } from "../../services/files";

function* fetchFiles() {
    yield takeEvery(FileActionTypes.FETCH_FILES, function* (action) {
        try {
            const files = yield APICall(`/api/v1/files/`, {
                method: "GET",
            });
            files.forEach((file, index) => {
                files[index].url = addFileURL(file);
            });
            yield put(fetchFilesSuccess(files));
        } catch (error) {
            yield put(fetchFilesFailure(error.detail));
        }
    });
}

function* fetchFilesCourse() {
    yield takeEvery(FileActionTypes.FETCH_FILES_COURSE, function* (action) {
        try {
            const files = yield APICall(`/api/v1/files/course`, {
                method: "GET",
            });
            files.forEach((file, index) => {
                files[index].url = addFileURL(file);
            });
            yield put(fetchFilesCourseSuccess(files));
        } catch (error) {
            yield put(fetchFilesCourseFailure(error.detail));
        }
    });
}

function* fetchFilesSubmission() {
    yield takeEvery(FileActionTypes.FETCH_FILES_SUBMISSION_ID, function* (action) {
        try {
            const files = yield APICall(`/api/v1/files/submission/${action.payload}`, {
                method: "GET",
            });
            files.forEach((file, index) => {
                files[index].url = addFileURL(file);
            });
            yield put(fetchFilesSubmissionIdSuccess(files));
        } catch (error) {
            yield put(fetchFilesSubmissionIdFailure(error.detail));
        }
    });
}

function* fetchFile() {
    yield takeEvery(FileActionTypes.FETCH_FILE, function* (action) {
        try {
            const file = yield APICall(`/api/v1/files/${action.payload}`, {
                method: "GET",
            });
            file.url = addFileURL(file);
            yield put(fetchFileSuccess(file));
        } catch (error) {
            yield put(fetchFileFailure(error.detail));
        }
    });
}

function* uploadFile() {
    yield takeEvery(FileActionTypes.UPLOAD_FILE, function* (action) {
        try {
            const formData = new FormData();
            formData.append("file", action.payload.file);

            let endpoint = `/api/v1/files/${action.payload.course_id}?
                            file_type=${action.payload.file_type}&
                            description=${action.payload.description}`;
            if (action.payload.submission_id) endpoint += `&submission_id=${action.payload.submission_id}`;
            const file = yield APICall(endpoint, {
                method: "POST",
                body: formData,
            });
            file.url = addFileURL(file);
            yield put(uploadFileSuccess(file));
        } catch (error) {
            yield put(uploadFileFailure(error.detail));
        }
    });
}

function* updateFile() {
    yield takeEvery(FileActionTypes.UPLOAD_FILE, function* (action) {
        try {
            const file = yield APICall(`/api/v1/files/`, {
                method: "PUT",
                body: JSON.stringify(action.payload),
            });
            file.url = addFileURL(file);
            yield put(uploadFileSuccess(file));
        } catch (error) {
            yield put(uploadFileFailure(error.detail));
        }
    });
}

function* fileMethods() {
    yield all([fetchFiles(), fetchFilesCourse(), fetchFilesSubmission(), fetchFile(), uploadFile(), updateFile()]);
}

export default fileMethods;
