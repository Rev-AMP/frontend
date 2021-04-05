import { call, put, select } from "redux-saga/effects";
import { logout, loginSuccess } from "redux/auth/action";

const parseErrorDetail = (detail) => {
    if (Array.isArray(detail)) {
        return detail;
    } else {
        return [detail];
    }
};

export const httpClient = async (url, parameters) => {
    try {
        return await fetch(url, parameters).then(async (response) => {
            const json = await response.json();
            return response.ok ? json : Promise.reject(json);
        });
    } catch (error) {
        error.detail = parseErrorDetail(error.detail);
        throw error;
    }
};

export function* APICall(endpoint, parameters) {
    let { accessToken, refreshToken, expiry } = yield select((state) => state.auth);

    // check for 30 seconds before expiry :)
    if (new Date() >= new Date((expiry - 30) * 1000)) {
        try {
            const response = yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}/api/v1/login/refresh-token`, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${refreshToken}`,
                },
            });
            yield put(loginSuccess(response));
            accessToken = response.access_token;
        } catch (error) {
            yield put(logout());
            error.detail = "Login session expired, please login again";
            throw error;
        }
    }

    if (!parameters.headers) parameters.headers = {};
    parameters.headers.Authorization = `bearer ${accessToken}`;

    return yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}${endpoint}`, parameters);
}
