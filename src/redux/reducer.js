import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import UserReducer from './user/reducer';
import AuthActionTypes from './auth/action.types';

const MainReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer
});

const RootReducer = (state, action) => {
    if (action.type === AuthActionTypes.LOGOUT) {
        state = undefined;
    }

    return MainReducer(state, action);
}

export default RootReducer;