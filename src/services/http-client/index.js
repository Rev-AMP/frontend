import { call, select } from "redux-saga/effects";

export const httpClient = async (url, parameters) =>
    await fetch(url, parameters).then(async (response) => {
        const json = await response.json();
        return response.ok ? json : Promise.reject(json);
    });

export function* APICall(endpoint, parameters) {
    let token = yield select((state) => state.auth.accessToken);

    if (!parameters.headers) parameters.headers = {};
    parameters.headers.Authorization = `bearer ${token}`;

    return yield call(httpClient, `${process.env.REACT_APP_BACKEND_URL}${endpoint}`, parameters);
}
