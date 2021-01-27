import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthReducer from "redux/auth/reducer";
import UserReducer from "redux/user/reducer";
import AuthActionTypes from "redux/auth/action.types";

const persistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["auth"],
};

const MainReducer = persistCombineReducers(persistConfig, {
    auth: AuthReducer,
    user: UserReducer,
});

const RootReducer = (state, action) => {
    if (action.type === AuthActionTypes.LOGOUT) {
        storage.removeItem("persist:auth");
        state.auth = state.user = undefined;
    }

    return MainReducer(state, action);
};

export default RootReducer;
