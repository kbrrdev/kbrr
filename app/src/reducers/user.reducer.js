import * as types from "@constants/actionTypes";
import initialState from "@constants/initialState";
import History from "@src/History";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState.user, action) => {
    switch (action.type) {
        case types.LOGIN_USER + types.FULFILLED: {
            return Object.assign({}, state, action.payload.data);
        }

        case types.UPDATE_USER_ACCESS_TOKEN: {
            return Object.assign({}, state, {
                accessToken: action.payload.token,
            });
        }

        default:
            return state;
    }
};
