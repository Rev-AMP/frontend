import FileActionTypes from "./action.types";

const initState = {
    errors: [],
    isLoading: false,
    files: [],
    selectedFile: null,
};

const FileReducer = (state = initState, action) => {
    switch (action.type) {
        case FileActionTypes.FETCH_FILES:
            return {
                ...state,
                errors: [],
                isLoading: true,
                files: [],
            };
        case FileActionTypes.FETCH_FILES_SUCCESS:
            return {
                ...state,
                files: action.payload,
                errors: [],
                isLoading: false,
            };
        case FileActionTypes.FETCH_FILES_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                files: [],
            };

        case FileActionTypes.FETCH_FILES_COURSE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case FileActionTypes.FETCH_FILES_COURSE_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                files: action.payload,
            };
        case FileActionTypes.FETCH_FILES_COURSE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case FileActionTypes.FETCH_FILE:
            return {
                ...state,
                errors: [],
                isLoading: true,
                selectedFile: null,
            };
        case FileActionTypes.FETCH_FILE_SUCCESS:
            return {
                ...state,
                selectedFile: action.payload,
                errors: [],
                isLoading: false,
            };
        case FileActionTypes.FETCH_FILE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
                files: [],
            };

        case FileActionTypes.UPLOAD_FILE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case FileActionTypes.UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                selectedFile: action.payload,
                errors: [],
                isLoading: false,
            };
        case FileActionTypes.UPLOAD_FILE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case FileActionTypes.UPDATE_FILE:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case FileActionTypes.UPDATE_FILE_SUCCESS:
            return {
                ...state,
                selectedFile: action.payload,
                errors: [],
                isLoading: false,
            };
        case FileActionTypes.UPDATE_FILE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        case FileActionTypes.FETCH_FILES_SUBMISSION_ID:
            return {
                ...state,
                errors: [],
                isLoading: true,
            };
        case FileActionTypes.FETCH_FILES_SUBMISSION_ID_SUCCESS:
            return {
                ...state,
                errors: [],
                isLoading: false,
                files: action.payload,
            };
        case FileActionTypes.FETCH_FILES_SUBMISSION_ID_FAILURE:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default FileReducer;
