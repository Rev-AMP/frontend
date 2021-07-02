import FileActionTypes from "./action.types";

export const fetchFiles = () => ({
    type: FileActionTypes.FETCH_FILES,
});

export const fetchFilesSuccess = (files) => ({
    type: FileActionTypes.FETCH_FILES_SUCCESS,
    payload: files,
});

export const fetchFilesFailure = (errors) => ({
    type: FileActionTypes.FETCH_FILES_FAILURE,
    payload: errors,
});

export const fetchFilesCourse = () => ({
    type: FileActionTypes.FETCH_FILES_COURSE,
});

export const fetchFilesCourseSuccess = () => ({
    type: FileActionTypes.FETCH_FILES_COURSE_SUCCESS,
});

export const fetchFilesCourseFailure = (errors) => ({
    type: FileActionTypes.FETCH_FILES_COURSE_FAILURE,
    payload: errors,
});

export const fetchFile = (fileId) => ({
    type: FileActionTypes.FETCH_FILE,
    payload: fileId,
});

export const fetchFileSuccess = (file) => ({
    type: FileActionTypes.FETCH_FILE_SUCCESS,
    payload: file,
});

export const fetchFileFailure = (errors) => ({
    type: FileActionTypes.FETCH_FILE_FAILURE,
    payload: errors,
});

export const uploadFile = (file) => ({
    type: FileActionTypes.UPLOAD_FILE,
    payload: file,
});

export const uploadFileSuccess = (file) => ({
    type: FileActionTypes.UPLOAD_FILE_SUCCESS,
    payload: file,
});

export const uploadFileFailure = (errors) => ({
    type: FileActionTypes.UPLOAD_FILE_FAILURE,
    payload: errors,
});

export const updateFile = (fileUpdate) => ({
    type: FileActionTypes.UPDATE_FILE,
    payload: fileUpdate,
});

export const updateFileSuccess = (file) => ({
    type: FileActionTypes.UPDATE_FILE_SUCCESS,
    payload: file,
});

export const updateFileFailure = (errors) => ({
    type: FileActionTypes.UPDATE_FILE_FAILURE,
    payload: errors,
});

export const fetchFilesSubmissionId = (submissionId) => ({
    type: FileActionTypes.FETCH_FILES_SUBMISSION_ID,
    payload: submissionId,
});

export const fetchFilesSubmissionIdSuccess = (files) => ({
    type: FileActionTypes.FETCH_FILES_SUBMISSION_ID_SUCCESS,
    payload: files,
});

export const fetchFilesSubmissionIdFailure = (errors) => ({
    type: FileActionTypes.FETCH_FILES_SUBMISSION_ID_FAILURE,
    payload: errors,
});
