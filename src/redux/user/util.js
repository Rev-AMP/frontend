import { APICall } from "../../services/http-client";

export const addProfilePictureURL = (user) =>
    `${process.env.REACT_APP_BACKEND_URL}/profile_pictures/${user.profile_picture}`;

export function* setProfilePicture(userID, profilePicture) {
    const formData = new FormData();
    formData.append("image", profilePicture);

    return yield APICall(`/api/v1/users/${userID}/profile_picture`, {
        method: "PUT",
        body: formData,
    });
}
