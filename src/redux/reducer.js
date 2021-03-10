import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthActionTypes from "redux/auth/action.types";
import AuthReducer from "redux/auth/reducer";
import UserReducer from "redux/user/reducer";
import SchoolReducer from "redux/school/reducer";
import YearReducer from "redux/year/reducer";
import TermReducer from "redux/term/reducer";

const persistConfig = {
    key: "revamp",
    storage: storage,
    whitelist: ["auth"],
};

const MainReducer = persistCombineReducers(persistConfig, {
    auth: AuthReducer,
    user: UserReducer,
    school: SchoolReducer,
    year: YearReducer,
    term: TermReducer,
});

const RootReducer = (state, action) => {
    if (action.type === AuthActionTypes.LOGOUT) {
        storage.removeItem("persist:revamp");
        const persist = { ...state._persist };
        state = {};
        state._persist = persist;
    }
    return MainReducer(state, action);
};

export default RootReducer;
