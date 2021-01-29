import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthActionTypes from "redux/auth/action.types";
import AuthReducer from "redux/auth/reducer";
import UserReducer from "redux/user/reducer";
import SchoolReducer from "redux/school/reducer";

const persistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["auth"],
};

const MainReducer = persistCombineReducers(persistConfig, {
    auth: AuthReducer,
    user: UserReducer,
    school: SchoolReducer,
});

const RootReducer = (state, action) => {
    if (action.type === AuthActionTypes.LOGOUT) {
        storage.removeItem("persist:auth");
        state.auth = state.user = state.school = undefined;
    }

    return MainReducer(state, action);
};

export default RootReducer;
