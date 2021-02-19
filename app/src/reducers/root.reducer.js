import { combineReducers } from "redux";
import user from "@reducers/user.reducer";
import company from "@reducers/company.reducer";
import rates from "@reducers/rate.reducer";
import offices from "@reducers/office.reducer";
import * as types from "@constants/actionTypes";
import History from "@src/History";

const appReducer = combineReducers({
    user,
    company,
    rates,
    offices,
});

const rootReducer = (state, action) => {
    if (action.type === types.LOGOUT_USER) {
        state = undefined;
        History.push("/");
    }

    return appReducer(state, action);
};

export default rootReducer;
