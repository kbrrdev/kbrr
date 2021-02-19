import * as types from "@constants/actionTypes";
import initialState from "@constants/initialState";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState.company, action) => {
    switch (action.type) {
        case types.GET_COMPANY + types.FULFILLED: {
            return Object.assign({}, state, action.payload.data);
        }

        default:
            return state;
    }
};
