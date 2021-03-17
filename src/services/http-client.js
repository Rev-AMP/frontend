import { call, put, select } from "redux-saga/effects";
import { logout, loginSuccess } from "redux/auth/action";

export const httpClient = async (url, parameters) =>
    await fetch(url, parameters).then(async (response) => {
        const json = await response.json();
        return response.ok ? json : Promise.reject(json);
    });

export function* APICall(endpoint, parameters) {
    let { accessToken, refreshToken, expiry } = yield select((state) => state.auth);
    const currentDate = new Date();

    if (currentDate >= expiry) {
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
            let customError = new Error();
            customError.detail = "Login session expired, please login again";
            throw customError;
        }
    }

    if (!parameters.headers) parameters.headers = {};
    parameters.headers.Authorization = `bearer ${accessToken}`;

    return yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}${endpoint}`, parameters);
}
