import { call } from "redux-saga/effects";
import httpClient from "../../services/http-client";

export const addProfilePictureURL = (user) =>
    `${process.env.REACT_APP_BACKEND_URL}/profile_pictures/${user.profile_picture}`;

export function* setProfilePicture(token, userID, profilePicture) {
    const formData = new FormData();
    formData.append("image", profilePicture);

    return yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${userID}/profile_picture`, {
        method: "Put",
        headers: {
            Authorization: `bearer ${token}`,
        },
        body: formData,
    });
}
